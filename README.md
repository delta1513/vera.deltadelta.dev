# vera.deltadelta.dev

A static Next.js site (App Router, `output: "export"`) served by a Cloudflare Worker.

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
