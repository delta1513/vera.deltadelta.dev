# Brief: "Help" animation player

## The problem

Vera sometimes gets stuck on a screen or popup on her phone. She sends a screenshot. Today the helper sends the screenshot back with a scribble that points to the button. Vera does not always understand the scribble, and some problems need more than one step.

A short, looping animation on top of the screenshot will show her what to do more clearly. For example: the screen dims, a big finger moves to the button, the button pulses, and the finger taps it.

## The workflow

1. Vera sends a screenshot to the helper.
2. The helper gives the screenshot to a Claude Code agent and describes what to show, for example "tap the blue Allow button".
3. The agent writes an animation file, adds the screenshot, and pushes both to a public GitHub repo for animation data.
4. Vera opens the Help app, or it is already open. The new animation plays at once. Cloudflare does not need to rebuild or deploy anything.

## The solution

### Overview

- Make a static Next.js player app. Deploy it one time. It never needs a rebuild for new animations.
- Keep each animation as a data file (JSON plus images) in a separate **public** GitHub repo. The app fetches the data in the browser at runtime.
- Write the player by hand: one client component with plain CSS animations (transforms, transitions, keyframes). **Do not use a third-party animation library** (no Lottie, GSAP, Motion, or Remotion). The scope is small and fixed, and one person maintains it. A small custom format is easier for agents to write correctly and gives a consistent look.

### The animation format

Each animation is a folder in the data repo, for example `animations/whatsapp-allow/`. The folder contains `animation.json` and its images.

```json
{
  "image": "screenshot.png",
  "steps": [
    { "type": "dim" },
    { "type": "finger", "from": [50, 90], "to": [72, 61] },
    { "type": "tap", "at": [72, 61], "box": [60, 57, 84, 65] },
    { "type": "image", "src": "screen2.png" },
    { "type": "tap", "at": [50, 80] },
    { "type": "done", "emoji": "👍" }
  ]
}
```

- All coordinates are percentages of the image (`[x, y]`, and `box` is `[x1, y1, x2, y2]`), so the animation scales to any screen.
- Keep the set of step types small and fixed:
  - `dim`: darken the screenshot.
  - `finger`: move a large 👆 between two points.
  - `tap`: a ripple and a pulsing ring, plus an optional highlight box.
  - `image`: switch to the next screenshot.
  - `done`: show a success emoji.
- Add a new step type only when a real case needs it.
- The animation loops. The player shows only a large 🔁 replay control (and optionally ⏸️). It shows no text.
- Keep a small `latest.json` (or similar) in the data repo that names the current animation. With no name in the URL, the player plays the latest animation. A name in the URL (for example `?a=whatsapp-allow`) plays that animation.

### How to fetch the data

- Do not rely on `raw.githubusercontent.com` URLs on a branch. That CDN caches files for about 5 minutes.
- Use the GitHub contents API (`api.github.com/repos/<owner>/<repo>/contents/<path>`) with the `Accept: application/vnd.github.raw` header. It is fresh within seconds, it supports CORS, and the 60 requests per hour unauthenticated limit is enough for one user. Another option is to get the latest commit SHA from the API, then load files from raw URLs that are pinned to that SHA.
- Check for a new animation about every 30 seconds. Start a new one automatically, so that Vera does not have to refresh.

### Privacy

The data repo must be public, because a static site cannot keep a secret token. Screenshots can show names, phone numbers, and messages. Use a separate repo that holds only animation data. Animation agents must crop or blur personal details before they commit a screenshot.

### Guide for animation agents

In the data repo, add an `AGENTS.md` that explains:
- the JSON format and each step type,
- the folder layout and how to update `latest.json`,
- the privacy rule about personal details.

Every future agent that makes an animation follows that file. Also add one sample animation that shows each step type.

### Home screen icon

Add one entry to `app/apps.ts` in this repo, for example `{ name: "Help", emoji: "🆘", ... }`, that links to the player.

## Decisions to confirm with the user before starting

1. The name of the public data repo.
2. Whether the player is a separate Worker app (like the other apps) or a page in this site.
