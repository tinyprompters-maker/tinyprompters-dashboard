# TinyPrompters Dashboard - Cloudflare Pages Deployment

## 📁 Files

| File | Size | Purpose |
|------|------|---------|
| `index.html` | ~7KB | Main dashboard with inline CSS/JS |
| `_headers` | ~500B | Security headers |
| `_routes.json` | ~100B | SPA routing config |

**Total: ~7.5KB** (well under 50KB limit)

## 🚀 Deployment Steps

### 1. Via Cloudflare Dashboard (Recommended)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Upload the 3 files from this folder:
   - `index.html`
   - `_headers`
   - `_routes.json`
4. Project name: `tinyprompters-dashboard`
5. Click **Deploy**

### 2. Via Wrangler CLI

```bash
# Install wrangler if needed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy (from this folder)
wrangler pages deploy . --project-name=tinyprompters-dashboard
```

### 3. Via Git Integration

1. Push these files to a GitHub/GitLab repo
2. In Cloudflare Pages, click **Connect to Git**
3. Select your repo and branch
4. Build settings: **None** (static site)
5. Deploy

## 🔐 Default Password

- **Password:** `tinyprompter2026`
- Change in `index.html` → `const PASS='...'`

## 🛡️ Security Features

- Client-side password auth (localStorage)
- CSP headers in `_headers`
- No external scripts except Google Fonts
- All styles inline

## 📝 Customization

Edit these in `index.html`:

```javascript
const AGENTS=[...];     // Agent list
const PASS='...';        // Password
const LS_KEY='tp_auth';  // localStorage key
```

## 🌐 Custom Domain

1. In Pages dashboard → **Custom domains**
2. Add: `dashboard.tinyprompters.com`
3. Follow DNS instructions
