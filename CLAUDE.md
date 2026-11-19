# Titan Forge Client UI

Welcome to the Titan Forge frontend UI repository! This repository is dedicated to the client-facing presentation, marketing pages, design components, and visual experience for Titan Forge.

## Instructions for Steve & Claude

### Allowed Edits
You are free to edit, iterate, and innovate on:
- UI and UX design
- Copy, headings, and editorial content
- React components and layouts (`app/`, components, stylesheets)
- Images, graphics, and static media in `public/` and `assets/`
- Marketing landing pages and responsive styling

### Protected & Locked Files (DO NOT MODIFY)
The following files and paths are critical platform infrastructure maintained by the platform team. Edits to these files will be blocked by automated integrity checks and CODEOWNERS:
- `vercel.json` (contains locked API proxy rewrites)
- `next.config.*` (Next.js routing and core config)
- `.github/*` (CI workflows and CODEOWNERS)
- `scripts/verify-ui-integrity.mjs` (UI integrity verification gate)
- `titan-events.js` (Attribution and analytics engine)
- `/apply` booking flow
- `robots*.txt` (SEO and crawler directives)

### Backend API Architecture
- No backend API routes or secrets live in this repository.
- All requests to `/api/*` are automatically proxied via `vercel.json` rewrites directly to the production platform backend (`https://titanforge-site.vercel.app/api/:path*`).
- Never add database credentials, private API keys, or `.env` files to this repository.

### Development & PR Workflow
1. Create a feature branch for your changes: `git checkout -b feature/your-feature-name`.
2. Test your changes locally:
   - `npm install`
   - `npm run verify:ui-integrity`
   - `npm run build`
3. Push your branch and open a Pull Request into `main`.
4. Check the automated Vercel Preview URL to inspect the live changes.
5. Ensure the `platform-integrity-gate` CI check passes cleanly before requesting review/merge.
