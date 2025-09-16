# Backend notes

- Implemented endpoints:
  - POST /api/volunteer
  - POST /api/newsletter
  - POST /create-checkout-session
  - POST /webhook
  - POST /admin/login
  - GET  /admin/volunteers
  - GET  /admin/export/volunteers.csv

- Use Prisma to run migrations and manage the DB schema at backend/prisma/schema.prisma
- Replace placeholder password checks with proper hashing (bcrypt).
- Replace nodemailer placeholders with SendGrid/Postmark providers using API keys.
