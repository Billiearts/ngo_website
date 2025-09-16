# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- Work in progress: improvements, bug fixes, feature branches.

## [1.3.0] - 2025-09-10
### Added
- Role-based admin permissions (superadmin, editor, viewer).
- Export functionality (CSV, Excel) for volunteers, subscribers, donations.
- Multi-language support (English, French, Spanish) for public website using i18next.

## [1.2.0] - 2025-09-10
### Added
- Admin Dashboard built with React/Next.js for managing volunteers, subscribers, and donations.
- Email notifications for new volunteer signups and successful donations.
- Integration with SendGrid/Postmark for transactional emails.

## [1.1.0] - 2025-09-10
### Added
- Database integration via Prisma ORM (supports Postgres or MongoDB).
- JWT authentication for admin interface to view volunteers and subscribers.
- Stripe webhook handler for recording donations and sending receipts.
- Accessibility improvements (alt text for images, ARIA roles).
- Image optimization pipeline (Sharp example + static asset recommendations).

## [1.0.0] - 2025-09-10
### Added
- Initial fullstack template: 5 frontend pages (Home, About, Programs, Newsletter, Contact).
- Responsive CSS and JavaScript for forms and Stripe Checkout redirect.
- Node.js (Express) backend with endpoints for volunteer signups, newsletter subscriptions, and Stripe Checkout session creation.
- Local JSON storage for volunteers and subscribers (data/ directory).
- README instructions for local development and deployment notes.
