# RootCraft — Open Source Cybersecurity Learning Platform

> **Craft your root-level security skills.**

**RootCraft** is a free, open-source cybersecurity learning portal built with zero build dependencies. It features an interactive Kali Linux terminal sandbox, 24+ security tool references, an AI Cybersecurity Copilot, a 12-track career roadmap with free study resources, and browser-based security utilities.

![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📖 What's Inside & How to Use It

### 🖥️ Interactive Terminal Sandbox (`Sandbox` tab)
A browser-based simulated Kali Linux terminal for practicing command syntax safely.
- **How to use:** Type any command into `kali@kali:~#` and press **Enter**, or click the **Quick** buttons below the terminal.
- **Commands to try:** `help`, `nmap 10.10.10.1`, `sqlmap`, `gobuster`, `hydra`, `nikto`, `msfconsole`, `aircrack-ng`, `searchsploit`, `tcpdump`, `ifconfig`, `neofetch`, `clear`.

### 🔧 Kali Linux Tool Directory (`Tools` tab)
Searchable reference of **24+ essential security tools** with ready-to-copy command examples across 6 categories:
- **Recon:** `nmap`, `theHarvester`, `recon-ng`, `amass`, `shodan`
- **Web Pentest:** `sqlmap`, `gobuster`, `nikto`, `Burp Suite`, `ffuf`, `wfuzz`, `dirb`
- **Password:** `hydra`, `john`, `hashcat`, `cewl`
- **Exploitation:** `metasploit`, `searchsploit`, `msfvenom`
- **Sniffing:** `wireshark`, `tcpdump`, `ettercap`, `bettercap`
- **Wireless:** `aircrack-ng`, `wifite`
- **How to use:** Use the search bar or category pills to filter tools, then hover over any command and click the **Copy** icon.

### 🤖 AI Cybersecurity Copilot (`AI Copilot` tab)
An interactive assistant with a built-in cybersecurity knowledge base.
- **How to use:** Ask about tools (`nmap`, `burp`, `metasploit`, `wireshark`), vulnerabilities (`sqlmap`, `xss`, `owasp`), or techniques (`privilege escalation`, `reverse shell`, `recon`, `password cracking`).

### 🗺️ Cybersecurity Career Roadmap (`Roadmap` tab)
**12 complete career tracks**, each broken down into phases, topics, tools, certifications, and **free study links**:

| Track | Difficulty |
|-------|-----------|
| SOC Analyst (Blue Team) | Beginner → Intermediate |
| Penetration Tester (Red Team) | Intermediate → Advanced |
| Application Security (AppSec) | Intermediate → Advanced |
| Cloud Security | Intermediate → Advanced |
| Network Security | Beginner → Advanced |
| Digital Forensics & IR (DFIR) | Intermediate → Advanced |
| Malware Analysis & Reverse Engineering | Advanced |
| GRC & Compliance | Beginner → Intermediate |
| Bug Bounty Hunter | Intermediate → Advanced |
| DevSecOps | Intermediate → Advanced |
| Cryptography & PKI | Intermediate → Advanced |
| IoT & OT Security | Intermediate → Advanced |

- **How to use:** Click any track card to view prerequisites and recommended certifications, then click each phase to expand topics, tools, and direct links to free labs (TryHackMe, HackTheBox, PortSwigger Academy, etc.).

### 🛠️ Security Utilities (`Utilities` tab)
Four instant, client-side tools (data never leaves your browser):
- **Base64 Encoder / Decoder** — Encode or decode strings.
- **Hash Identifier** — Paste a hash (MD5, SHA-1, SHA-256, SHA-512, bcrypt, Argon2, etc.) and click **Analyze**.
- **URL Encoder / Decoder** — Percent-encode or decode URLs and payloads.
- **Password Generator** — Adjust length (8–64), toggle character sets, and generate cryptographically random passwords (`crypto.getRandomValues`).

---

## 🚀 Quick Start

### Option 1: Open Directly (No Server Needed)
```bash
git clone https://github.com/vaibhav-srivastava02/rootcraft.git
cd rootcraft
# Open index.html directly in your browser
```

### Option 2: Local Dev Server (Node.js)
```bash
git clone https://github.com/vaibhav-srivastava02/rootcraft.git
cd rootcraft
node server.mjs
# Open http://localhost:3000
```

### Option 3: GitHub Pages (Free Live Hosting)
1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch` → `main` / `/ (root)`.
4. Your site will be live at `https://vaibhav-srivastava02.github.io/rootcraft/`.

---

## 📁 Project Structure

```
rootcraft/
├── index.html          # Main portal (Sandbox, Tools, AI Copilot, Roadmap, Utilities, Auth)
├── server.mjs          # Lightweight Node.js static dev server
├── js/
│   ├── data.js         # 24+ tools database & 12-track career roadmap
│   └── app.js          # Portal logic, terminal simulator, AI KB, & utilities
├── README.md
├── LICENSE
└── .gitignore
```

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **Tailwind CSS** (CDN) — Utility-first styling
- **Vanilla JavaScript (ES6+)** — Zero frameworks, zero build step
- **Web Crypto API** — CSPRNG password generation
- **Font Awesome 6** & **JetBrains Mono / Inter** — UI icons and typography

## 🤝 Contributing

Contributions are welcome! Ideas to expand RootCraft:
- Add more Kali tools and terminal simulations
- Add new utilities (Subnet Calculator, JWT Decoder, CyberChef-style transforms)
- Add dark/light theme toggle or localization

## ⚠️ Disclaimer

This project is for **educational and defensive cybersecurity research only**. Always obtain proper authorization before testing security on any system you do not own.

## 📄 License

Licensed under the MIT License — see [LICENSE](LICENSE) for details.
