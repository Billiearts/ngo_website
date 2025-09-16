# ReadForward NGO — Fullstack Template

This is a production-ready skeleton for a five-page NGO website with:
- Public frontend (Home, About, Programs, Newsletter, Contact) — static HTML/CSS/JS
- Node.js (Express) backend with Prisma (Postgres/Mongo), Stripe Checkout + webhook
- JWT-based admin authentication with role-based permissions
- Admin Dashboard (Next.js) for volunteers/subscribers/donations (skeleton)
- Email notifications (SendGrid/Postmark) integration
- Image optimization suggestions (Sharp)
- Multi-language support (i18next) for public pages
- Export (CSV / Excel) endpoints for admin

## Quick start (development)
1. Backend:
   - `cd backend`
   - `npm install`
   - copy `.env.example` to `.env` and fill in secrets (`DATABASE_URL`, `STRIPE_*`, `JWT_SECRET`, `SENDGRID_API_KEY`)
   - `npx prisma migrate dev` (for Postgres) or `npx prisma db push` (for Mongo)
   - `npm run dev`

2. Frontend:
   - Serve `frontend/` as static files (e.g. `npx serve frontend -l 5000`)

3. Admin dashboard:
   - `cd admin-dashboard`
   - `npm install`
   - `npm run dev` (Vercel/Next.js recommended)

## Files included
- `frontend/` — static public site
- `backend/` — Express server + Prisma schema + routes
- `admin-dashboard/` — Next.js skeleton
- `CHANGELOG.md` — project changelog
- `.env.example` — environment variables example

## Notes
- This repository is a scaffold. Replace test keys with production keys and secure env variables in your host.
- See `backend/README.md` for more backend setup details.
# ngo_website
