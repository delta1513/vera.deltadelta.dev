# vera.deltadelta.dev

A static Next.js site (App Router, `output: "export"`) served by a Cloudflare Worker.

A home screen for Vera, in the style of an iPad home screen. Each app is a large emoji icon with one word under it, and it links to a separate app. Screens change with the arrow buttons or by swiping.

To add an app, edit `app/apps.ts`. Each inner list is one screen.

## Commands

| Command | Result |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site to `out/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Build, then serve `out/` with `wrangler dev` |

## Deploy

Cloudflare builds and deploys on every push to `main`. The Worker name in Cloudflare must be `vera-deltadelta-dev` (see `wrangler.jsonc`).

See `AGENTS.md` for the stack rules and limits of the static export.

## Credits

The tulip favicon (`app/icon.png`, `app/apple-icon.png`) is the 3D emoji from [Noto Emoji](https://github.com/googlefonts/noto-emoji) (`3D/png`), by Google, under the SIL Open Font License 1.1.
