# Git → Cloudflare Pages Deployment Guide

## ✅ Setup Complete

**Repository Created:** https://github.com/tinyprompters-maker/tinyprompters-dashboard

---

## 🚀 Step-by-Step: Connect GitHub to Cloudflare Pages

### Step 1: Open Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. Sign in with **Tinyprompters@gmail.com**

### Step 2: Create Pages Project

1. Navigate to **Pages** in the left sidebar
2. Click **Create a project**
3. Select **Connect to Git**

### Step 3: Connect GitHub Repository

1. Click **Connect GitHub**
2. Authorize Cloudflare to access your GitHub account (if not already done)
3. Select **tinyprompters-maker/tinyprompters-dashboard** from the repo list
4. Click **Begin setup**

### Step 4: Configure Build Settings

Since this is a **static HTML site** (no build step needed):

| Setting | Value |
|---------|-------|
| Project name | `tinyprompters-dashboard` |
| Production branch | `master` |
| Framework preset | `None` |
| Build command | *(leave empty)* |
| Build output directory | `/` (root) |

### Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will build and deploy the site
3. You'll get a URL like: `https://tinyprompters-dashboard.pages.dev`

---

## 🔐 Optional: GitHub Actions Deployment

If you prefer using GitHub Actions (already configured in `.github/workflows/deploy.yml`):

### Add Secrets to GitHub

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Create at Cloudflare → My Profile → API Tokens → Create Token |
| `CLOUDFLARE_ACCOUNT_ID` | Find in Cloudflare dashboard right sidebar |

### Creating a Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Use the **Cloudflare Pages** template
4. Permissions needed:
   - **Cloudflare Pages**: Edit
   - **Zone**: Read (for tinyprompters.com)
5. Account Resources: Include your account
6. Click **Continue to summary** → **Create token**

---

## 🔄 How It Works

### Automatic Deployment (Git Integration)

```
git push origin master
        ↓
Cloudflare Pages detects push
        ↓
Automatic build & deploy
        ↓
Live at: https://tinyprompters-dashboard.pages.dev
```

### Preview Deployments

Every Pull Request gets a **preview URL**:
- Push to a branch → create PR
- Cloudflare generates preview link
- Review changes before merging

---

## 📋 Post-Deployment Checklist

- [ ] Cloudflare Pages project created
- [ ] GitHub repository connected
- [ ] First deployment successful
- [ ] Custom domain configured (optional)
- [ ] Environment variables set (if needed)

---

## 🌐 Custom Domain (Optional)

To use `dashboard.tinyprompters.com`:

1. In Cloudflare Pages → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `dashboard.tinyprompters.com`
4. Cloudflare will add the DNS record automatically

---

## 🛠️ Useful Commands

```bash
# Check repo status
cd ~/workspace-tinyprompters
git status

# Push changes
git add .
git commit -m "Update dashboard"
git push origin master

# View remote
git remote -v

# Check GitHub repo
gh repo view tinyprompters-dashboard --web
```

---

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions for Cloudflare Pages](https://github.com/cloudflare/pages-action)
