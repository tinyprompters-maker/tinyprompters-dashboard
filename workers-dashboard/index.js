// TinyPrompters Agent Mission Control Dashboard

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // API routes
    if (path === '/api/auth') {
      return handleAuth(request);
    }
    
    if (path === '/api/agents') {
      return handleAgents(request);
    }
    
    if (path === '/api/costs') {
      return handleCosts(request);
    }
    
    // Serve dashboard HTML for all other routes
    return new Response(getDashboardHTML(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        ...corsHeaders
      }
    });
    
  } catch (err) {
    return new Response('Error: ' + err.message, { status: 500 });
  }
}

async function handleAuth(request) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }
  
  try {
    const body = await request.json();
    const password = body.password;
    const expectedPassword = 'tinyprompter2026';
    
    if (password === expectedPassword) {
      return jsonResponse({ 
        success: true, 
        token: generateToken(),
        expires: Date.now() + 24 * 60 * 60 * 1000
      });
    }
    
    return jsonResponse({ error: 'Invalid password' }, 401);
  } catch (e) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleAgents(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }
  
  return jsonResponse({
    agents: [
      { id: 'swarm-starters', name: 'Swarm Starters', status: 'running', cost: 12.45, uptime: '99.9%', lastActive: '2 min ago' },
      { id: 'swarm-followers', name: 'Swarm Followers', status: 'running', cost: 8.32, uptime: '99.9%', lastActive: '5 min ago' },
      { id: 'crosspilla', name: 'Crosspilla', status: 'idle', cost: 0.00, uptime: '98.5%', lastActive: '2 hours ago' },
    ]
  });
}

async function handleCosts(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }
  
  return jsonResponse({
    today: 1.60,
    thisWeek: 45.20,
    thisMonth: 185.40,
    breakdown: {
      'Claude Opus': 120.50,
      'Claude Sonnet': 45.20,
      'Kimi': 19.70
    }
  });
}

function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function getDashboardHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TinyPrompters | Agent Mission Control</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary:#2563eb; --primary-dark:#1d4ed8; --success:#22c55e; --warning:#f59e0b; --danger:#ef4444; --bg-dark:#0f172a; --bg-card:#1e293b; --text:#f1f5f9; --text-muted:#94a3b8; --border:#334155; }
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',system-ui,sans-serif;background:var(--bg-dark);color:var(--text);min-height:100vh}
    .login-screen{display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,var(--bg-dark) 0%,#1e1b4b 100%)}
    .login-box{background:var(--bg-card);padding:3rem;border-radius:1rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);text-align:center;max-width:400px;width:90%;border:1px solid var(--border)}
    .login-box h1{font-size:1.875rem;margin-bottom:0.5rem;font-weight:800}
    .login-box .subtitle{color:var(--text-muted);margin-bottom:2rem}
    .login-box input{width:100%;padding:0.875rem 1rem;border:1px solid var(--border);border-radius:0.5rem;background:var(--bg-dark);color:var(--text);font-size:1rem;margin-bottom:1rem}
    .login-box button{width:100%;padding:0.875rem;background:var(--primary);color:white;border:none;border-radius:0.5rem;font-size:1rem;font-weight:600;cursor:pointer}
    .error-msg{color:var(--danger);margin-top:1rem;font-size:0.875rem}
    .dashboard{display:none}
    .dashboard.active{display:block}
    .header{background:var(--bg-card);border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between}
    .header-logo{width:32px;height:32px;background:linear-gradient(135deg,var(--primary),#7c3aed);border-radius:0.5rem;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.875rem}
    .main{padding:2rem;max-width:1400px;margin:0 auto}
    .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;margin-bottom:2rem}
    .stat-card{background:var(--bg-card);border:1px solid var(--border);border-radius:0.75rem;padding:1.5rem}
    .stat-value{font-size:2rem;font-weight:800}
    .section{background:var(--bg-card);border:1px solid var(--border);border-radius:0.75rem;padding:1.5rem;margin-bottom:1.5rem}
    .agent-table{width:100%;border-collapse:collapse}
    .agent-table th,.agent-table td{text-align:left;padding:1rem;border-bottom:1px solid var(--border)}
    .status-badge{display:inline-flex;align-items:center;gap:0.375rem;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:600}
    .status-badge.running{background:rgba(34,197,94,0.2);color:var(--success)}
    .status-badge.idle{background:rgba(245,158,11,0.2);color:var(--warning)}
    .btn{padding:0.5rem 1rem;border-radius:0.375rem;font-size:0.875rem;font-weight:500;cursor:pointer;border:1px solid var(--border);background:transparent;color:var(--text)}
    .btn-primary{background:var(--primary);border-color:var(--primary);color:white}
  </style>
</head>
<body>
  <div class="login-screen" id="loginScreen">
    <div class="login-box">
      <div class="header-logo" style="margin:0 auto 1rem;">TP</div>
      <h1>TinyPrompters</h1>
      <p class="subtitle">Agent Mission Control</p>
      <input type="password" id="passwordInput" placeholder="Enter password...">
      <button onclick="login()">Sign In</button>
      <div class="error-msg" id="loginError"></div>
    </div>
  </div>
  
  <div class="dashboard" id="dashboard">
    <header class="header">
      <h1><span class="header-logo">TP</span>TinyPrompters</h1>
      <button class="btn" onclick="logout()">Sign Out</button>
    </header>
    <main class="main">
      <div class="stats-grid">
        <div class="stat-card"><h3>Active Agents</h3><div class="stat-value">2</div></div>
        <div class="stat-card"><h3>Today's Cost</h3><div class="stat-value">$1.60</div></div>
        <div class="stat-card"><h3>This Month</h3><div class="stat-value">$185.40</div></div>
      </div>
      
      <div class="section">
        <h2>Active Agents</h2>
        <table class="agent-table">
          <thead><tr><th>Agent</th><th>Status</th><th>Cost</th></tr></thead>
          <tbody>
            <tr><td><strong>Swarm Starters</strong></td><td><span class="status-badge running">running</span></td><td>$12.45</td></tr>
            <tr><td><strong>Swarm Followers</strong></td><td><span class="status-badge running">running</span></td><td>$8.32</td></tr>
          </tbody>
        </table>
      </div>
      
      <div class="section">
        <h2>Quick Actions</h2>
        <button class="btn btn-primary">+ Deploy Agent</button>
      </div>
    </main>
  </div>
  
  <script>
    function login() {
      var password = document.getElementById('passwordInput').value;
      if (password === 'tinyprompter2026') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
      } else {
        document.getElementById('loginError').textContent = 'Invalid password';
      }
    }
    function logout() {
      location.reload();
    }
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') login();
    });
  </script>
</body>
</html>`;
}
