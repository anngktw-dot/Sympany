# Sympany Frontend

Frontend base for `Login` and `Registration` screens built with `Next.js + TypeScript`.

## Stack

- `Next.js` App Router
- `TypeScript`
- `react-hook-form`
- `zod`
- `ESLint`
- `Prettier`
- `Husky`
- `lint-staged`
- `GitHub Actions`

## Project Structure

```txt
src/
  app/
  features/
  shared/
  widgets/
```

Architecture details are described in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Local Development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Open:

```txt
http://127.0.0.1:3000
http://127.0.0.1:3000/register
http://127.0.0.1:3000/verify-email
http://127.0.0.1:3000/forgot-password
http://127.0.0.1:3000/reset-password
```

## Quality Commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format
```

## Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

## CI

CI workflow runs:

- lint
- typecheck
- build

File:

- [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)

## CD / Vercel Deploy

Deploy workflow is already prepared:

- [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)

To enable deploys from GitHub Actions, add these repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### How to get them

`VERCEL_TOKEN`

1. Open Vercel
2. Go to `Settings -> Tokens`
3. Create a new token

`VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

1. Link the project to Vercel
2. Run:

```bash
pnpm dlx vercel link
```

3. After linking, inspect `.vercel/project.json`
4. Copy `orgId` and `projectId` into GitHub Secrets

## Pre-commit Hooks

Husky pre-commit hook runs:

- `lint-staged`

That means staged files are auto-formatted and linted before commit.
