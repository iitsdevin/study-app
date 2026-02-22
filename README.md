# Study Planner App

## Run locally

1. `cd /Users/devinearle/Documents/New\ project/study-planner-app`
2. `npm install`
3. `npm run dev`

## Build for production

- `npm run build`
- Output files are in `dist/`

## GitHub Pages (fixes blank screen)

GitHub Pages must serve the built `dist` files, not the source files.

1. In GitHub repo settings, set Pages source to **GitHub Actions**.
2. Add this workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Study Planner

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install deps
        run: npm install
        working-directory: study-planner-app
      - name: Build
        run: npm run build
        working-directory: study-planner-app
      - uses: actions/upload-pages-artifact@v3
        with:
          path: study-planner-app/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Commit to Git

1. `git add study-planner-app`
2. `git commit -m "Add study planner React app"`
3. `git push`

This app is now a standard Vite + React project, so it can be hosted on GitHub Pages, Netlify, Vercel, or any static host.
