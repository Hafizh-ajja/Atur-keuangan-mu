# Run doc — Keuangan Masjid (Vite + React)

## Reproduce uncommitted artifacts

No secret/env files are needed. This is a plain Vite + React app:

- Dependencies: `npm install` (lockfile: `package-lock.json`, uses `npm`).
- No `.env*` files exist; none are read by the app or Vite config.
- The font **Plus Jakarta Sans is self-hosted** at `src/assets/fonts/plus-jakarta-sans.woff2`
  (variable font, weights 200–800), referenced via `@font-face` in `src/index.css`.
  No network needed to render it.

## Run the server

```bash
npm run dev
```

- Default port: 5173. Prefer it if free; if taken (e.g. another instance), use
  `npm run dev -- --port 5174 --strictPort`.
- **Must bind IPv4**: run with `--host 127.0.0.1`. Without it Vite listens only on
  IPv6 `[::1]` and the preview registration probe (which hits `127.0.0.1`) fails
  with "did not answer an HTTP request".
  Full command: `npm run dev -- --port 5174 --strictPort --host 127.0.0.1`.
- Current live instance was started detached on **http://127.0.0.1:5174/**
  (port 5173 was occupied by the user's own server).
- Logs: `.freebuff/preview-7170b9de-0b40-4ad5-b16b-a204baa4f4c2.log` (+ `.err`).

## Gotcha

- After editing `tailwind.config.js`, **restart the dev server** — Vite caches the
  PostCSS/Tailwind config and will keep serving the old theme (e.g. the default
  `font-sans` stack) until then. A plain `npm run build` picks the new config up fine.
