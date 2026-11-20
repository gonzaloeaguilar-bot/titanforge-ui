# Titan Forge — Website UI Repository

This repository controls the frontend UI/UX of `titanforgefit.com` so Steve (`TitanForge56`) and Claude can update copy, photos, layouts, and visual design directly — without touching backend systems, secrets, or tracking.

## Quick Start for Claude
Tell Claude:
> "Read `CLAUDE.md` first, create a new branch from `main`, make [describe your change], and open a Pull Request."

## How Publishing Works (Self-Serve)
1. **Create a branch** from `main` (direct pushes to `main` are blocked).
2. **Edit UI/UX files:**
   - `page-home.jsx`, `page-more.jsx`, `page-start.jsx`, `page-train.jsx`, `components.jsx`, `app.jsx` (automatically compiled into `assets/app.bundle.js` during build)
   - `content/editable-copy.json` (shared copy)
   - `public/` and `assets/` (images and styles)
3. **Open a Pull Request** into `main`.
4. **Wait 1–2 minutes** for `platform-integrity-gate` to turn green and click the automatic **Vercel Preview URL** posted on the PR to review on phone and desktop.
5. **Publish live:** Once `platform-integrity-gate` is green and you like the preview, click **Merge pull request** on GitHub. It builds and deploys automatically.

## Locked Files (Do Not Modify)
Changes to these files require `@gonzaloeaguilar-bot` approval because they keep lead capture, booking, search/AI attribution, and backend APIs connected:
- `vercel.json` (routes `/api/*` to the private platform backend)
- `package.json`, `next.config.*`
- `.github/*`, `scripts/verify-ui-integrity.mjs`, `scripts/build-app-bundle.mjs`
- `titan-events.js`, `robots*.txt`

Never add `.env` files, API routes, or secrets to this repository. See [`CLAUDE.md`](./CLAUDE.md) for full instructions.
