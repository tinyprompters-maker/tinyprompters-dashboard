# TinyPrompters Dashboard

Agent Mission Control dashboard for monitoring and controlling AI agents.

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/tinyprompters-maker/tinyprompters-dashboard.git
cd tinyprompters-dashboard

# Open locally
open index.html
```

## 📁 Structure

```
.
├── index.html          # Main dashboard
├── .github/
│   └── workflows/
│       └── deploy.yml  # Auto-deployment to Cloudflare Pages
└── .gitignore          # Git ignore rules
```

## 🌐 Deployment

This project auto-deploys to Cloudflare Pages on every push to `main`.

### Setup Required

1. **Fork/clone this repo** to your GitHub account
2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose this repository
3. **Configure build settings**:
   - Build command: *(leave empty - static site)*
   - Build output directory: `/`
4. **Add secrets** (if using GitHub Actions):
   - `CLOUDFLARE_API_TOKEN` - From Cloudflare API Tokens
   - `CLOUDFLARE_ACCOUNT_ID` - From Cloudflare dashboard sidebar

## 🔑 Environment Variables

The dashboard connects to backend services using:
- `AGENT_STATUS_ENDPOINT` - Agent status API
- `COST_API_ENDPOINT` - Cost tracking API

Configure these in your Cloudflare Pages dashboard under **Settings** → **Environment variables**.

## 📄 License

MIT - TinyPrompters
