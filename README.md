# Sympany Frontend

A structured authentication frontend built with **Next.js, TypeScript, React Hook Form, and Zod**.

The project focuses on clean front-end architecture, reusable form logic, validation, and a production-style development workflow.

## Features

- Login flow
- Registration flow
- Email verification screen
- Forgot-password flow
- Reset-password flow
- Client-side form validation
- Reusable UI and feature structure
- Pre-commit formatting and linting
- CI checks for lint, type safety, and build
- Prepared Vercel deployment workflow

## Tech Stack

- **Next.js 15** — App Router
- **React 19**
- **TypeScript**
- **React Hook Form**
- **Zod**
- **ESLint**
- **Prettier**
- **Husky + lint-staged**
- **GitHub Actions**
- **Vercel** — deployment workflow

## Project Structure

```text
src/
├── app/
├── features/
├── shared/
└── widgets/
```

The codebase separates application routes, feature logic, shared components, and larger UI blocks to keep the project maintainable as it grows.

More details: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Available Routes

```text
/
/register
/verify-email
/forgot-password
/reset-password
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Create local environment settings:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
pnpm dev
```

Open:

```text
http://127.0.0.1:3000
```

## Quality Commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format
```

## CI/CD

GitHub Actions checks:

- lint
- typecheck
- production build

A Vercel deployment workflow is also prepared in `.github/workflows/deploy.yml`.

## Development Workflow

Husky and lint-staged run automated formatting and linting on staged files before commit, helping keep the codebase consistent.

---

### What this project demonstrates

Sympany shows practical experience with modern React/Next.js development, typed form handling, validation, scalable folder structure, automated quality checks, and deployment-oriented project setup.
