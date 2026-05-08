# Deployment Checklist

## Vercel

This project already includes a GitHub deploy workflow for `main`.

Workflow file:

- [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)

## Required GitHub Secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Setup Steps

1. Create a Vercel project
2. Link local project:

```bash
pnpm dlx vercel link
```

3. Take values from `.vercel/project.json`
4. Add them to GitHub repository secrets
5. Push to `main`

## Production Validation

Before every deploy:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Notes

- Deploy workflow is skipped automatically if secrets are missing
- CI and CD are separated intentionally
- For preview deploys, the workflow can be extended later for pull requests
