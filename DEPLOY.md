# How to deploy SalamFood

This is a static React app (Parcel). It is hosted for **free** on **GitHub Pages**.

**Live site:** https://abdullahriax.github.io/SalamFood/

---

## What we set up (already in this repo)

1. A production build command that outputs files into `dist/`
2. A GitHub Actions workflow that builds and publishes `dist/` on every push to `main`
3. React Router `basename` so routes work under `/SalamFood/`
4. A `404.html` copy so Cart / Checkout links still work on refresh
5. `.gitignore` so `node_modules`, `dist`, and `.parcel-cache` are not committed

You only need the GitHub Pages UI steps below if the site is not live yet.

---

## One-time GitHub Pages setup

Do this once in the browser.

### 1. Open Pages settings

https://github.com/AbdullahRiax/SalamFood/settings/pages

### 2. Choose GitHub Actions

1. Under **Build and deployment → Source**, open the dropdown.
2. Select **GitHub Actions** (not “Deploy from a branch”).
3. Click **Save**.

Do **not** click **Configure** on the Jekyll or Static HTML cards. This repo already has a workflow at `.github/workflows/deploy.yml`.

### 3. Run (or re-run) the workflow

The first run often fails with `Failed to create deployment (status: 404)` if Pages was not enabled yet. That is expected. The **build** job can be green while **deploy** is red.

1. Open the **Actions** tab: https://github.com/AbdullahRiax/SalamFood/actions
2. Click the failed run (**Deploy to GitHub Pages**).
3. Click **Re-run jobs** (top right) → **Re-run failed jobs**.

Wait until both **build** and **deploy** are green.

### 4. Open the live site

https://abdullahriax.github.io/SalamFood/

If the page looks old, hard-refresh with `Ctrl + F5`.

---

## How a deploy works after that

Every time you push to `main`, GitHub does this automatically:

```
git push origin main
        ↓
GitHub Actions: npm ci
        ↓
GitHub Actions: npm run build
        ↓
Uploads the dist/ folder
        ↓
Publishes GitHub Pages
```

No extra command is required after the one-time setup.

---

## Commands on your machine

### Run locally

```bash
npm install
npm start
```

Open the URL Parcel prints (usually `http://localhost:1234`).

### Test a production build locally

```bash
npm run build
```

This creates `dist/`. You do not upload `dist/` yourself. GitHub Actions builds it in the cloud.

### Publish an update

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Then check **Actions** until the new run is green.

---

## Files that make deploy work

| File | Why it exists |
| --- | --- |
| `package.json` → `build` | Parcel builds the app into `dist/` with `--public-url /SalamFood/` |
| `scripts/prepare-gh-pages.js` | Copies `index.html` to `404.html` and adds `.nojekyll` |
| `.github/workflows/deploy.yml` | GitHub Actions: install, build, deploy |
| `App.jsx` | Sets `basename: "/SalamFood"` on github.io so `/Cart` becomes `/SalamFood/Cart` |
| `.gitignore` | Keeps `node_modules`, `dist`, and `.parcel-cache` out of git |

---

## Why `/SalamFood/` is in the build

GitHub project pages are not at the domain root. They live at:

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

For this repo that is `/SalamFood/`.

- `--public-url /SalamFood/` makes CSS, JS, and the logo load from the right folder
- React Router `basename` makes Home, Cart, Checkout, and restaurant pages match that folder
- `404.html` is a copy of `index.html` so refreshing `/SalamFood/Cart` still opens the app instead of a GitHub 404

If you rename the GitHub repo, change `/SalamFood/` in:

- `package.json` (`build` script)
- `App.jsx` (`basename`)
- this doc and `README.md`

---

## Troubleshooting

**Deploy job is red with status 404**  
Pages was not enabled, or the source was not **GitHub Actions**. Enable it, then **Re-run failed jobs**.

**Site is 404 after a green deploy**  
Wait 1–2 minutes, then hard-refresh. Confirm the URL includes the repo name: `/SalamFood/`.

**CSS or logo missing**  
`public-url` must match the repo name. Rebuild and push.

**Cart / restaurant page 404 on refresh**  
`scripts/prepare-gh-pages.js` must run after the Parcel build (it is already chained in `npm run build`).

**Do not use the Jekyll or Static HTML “Configure” buttons**  
Those create a different workflow and can fight with `deploy.yml`.
