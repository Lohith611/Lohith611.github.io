export interface Project {
  id: string
  name: string
  job_config: {
    title: string
    requirements: string[]
    required_skills: string[]
    experience_years: number
    education_level: string
  }
  resume_ids: string[]
  status: 'draft' | 'analyzing' | 'completed'
  created_at: string
  updated_at: string
  start_date: string
  end_date: string
  github_link?: string
  image_url?: string
  category: 'Cybersecurity' | 'OT/ICS' | 'Malware' | 'Network'
  detailed_description?: string
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'OT/ICS Modbus TCP Honeypot',
    job_config: {
      title: 'Live on public VPS, actively collecting real attacker sessions. 3 virtual PLCs (conveyor, hydraulic pump, heater) with physics-based register simulation.',
      requirements: [],
      required_skills: ['Python', 'PyModbus', 'Flask', 'Docker', 'OVHcloud', 'MITRE ATT&CK for ICS', 'SQLite', 'Leaflet.js', 'Chart.js'],
      experience_years: 1,
      education_level: 'Master'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
    start_date: '2025',
    end_date: '2026 (Live & Ongoing)',
    category: 'OT/ICS',
    detailed_description: `<ul>
      <li>Live-deployed on OVHcloud VPS (Ubuntu 22.04, Port 502) — indexed by Shodan within 24-48 hours, actively collecting real attacker sessions</li>
      <li>3 virtual PLCs simulated (conveyor belt, hydraulic pump, industrial heater) with physics-based register dynamics (temperature, pressure, RPM)</li>
      <li>13 MITRE ATT&CK for ICS detection rules covering T0836, T0843, T0846, T0855, T0862</li>
      <li>Graduated response system: Monitor → Warn → Throttle → Block</li>
      <li>Phantom writes — returns Modbus SUCCESS without changing real PLC state, extending attacker engagement</li>
      <li>Real-time Flask dashboard with geo-mapped attacker IPs, PLC topology view, MITRE technique charts, per-attacker threat scoring table</li>
    </ul>`
  },
  {
    id: '2',
    name: 'OT/ICS SIEM Dashboard',
    job_config: {
      title: 'Production SIEM ingesting SSH, Apache/Nginx, and SCADA logs with correlation rules, MITRE ATT&CK mapper, and automated IR playbook generator.',
      requirements: [],
      required_skills: ['Python', 'Flask', 'SQLite', 'Chart.js', 'Leaflet.js', 'scikit-learn', 'AbuseIPDB API', 'VirusTotal API'],
      experience_years: 1,
      education_level: 'Master'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-02-01T10:00:00Z',
    updated_at: '2025-02-01T10:00:00Z',
    start_date: '2025',
    end_date: '2025',
    category: 'Cybersecurity',
    github_link: 'https://github.com/Lohith115/OT-ICS-Security-Operations-Center-SIEM-Dashboard',
    detailed_description: `<ul>
      <li>Production SIEM ingesting SSH auth logs, Apache/Nginx access logs, and SCADA event logs in real time</li>
      <li>Correlation rules detect SSH brute force (5+ failures/5 min), web directory scanning (10+ 404s/5 min), admin panel probing</li>
      <li>MITRE ATT&CK mapper enriches every alert with tactic, technique, and risk score</li>
      <li>Isolation Forest ML anomaly detection (5-feature extraction)</li>
      <li>Threat intelligence integration: AbuseIPDB and VirusTotal IP reputation enrichment</li>
      <li>Automated Incident Response playbook generator with PDF/Markdown export</li>
      <li>Alert lifecycle: NEW → IN_PROGRESS → RESOLVED</li>
    </ul>`
  },
  {
    id: '3',
    name: 'Malware Analysis Lab',
    job_config: {
      title: 'Static and Dynamic analysis of real malware samples from MalwareBazaar; authored YARA detection rules per MITRE ATT&CK TTP mapping.',
      requirements: [],
      required_skills: ['FlareVM', 'FakeNet-NG', 'PEStudio', 'PEiD', 'ProcMon', 'Process Hacker', 'Wireshark', 'YARA', 'dnSpy', 'Regshot'],
      experience_years: 1,
      education_level: 'Bachelor'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-02-15T10:00:00Z',
    updated_at: '2025-02-15T10:00:00Z',
    start_date: '2026',
    end_date: '2026',
    category: 'Malware',
    github_link: 'https://github.com/Lohith115/malware-analysis-lab',
    detailed_description: `<ul>
      <li>Analyzed 3 real malware families from MalwareBazaar in isolated FlareVM environment</li>
      <li>Sample 1 — NukeReactor/AsyncRAT: Process Hollowing into RegAsm.exe, AES-encrypted payload, C2 beacon every 26s to asyc.pukkre.com</li>
      <li>Sample 2 — JS PowerShell Stager: 5-layer obfuscation (JS → PowerShell → BASE64 → rotational XOR), anti-sandbox evasion detected</li>
      <li>Sample 3 — AutoIt Compiled Malware: Active HTTPS C2 communication captured by FakeNet-NG, 42/72 VT detections, 8.3M registry events in 5 minutes</li>
      <li>Authored 9 custom YARA detection rules across all 3 samples</li>
      <li>Full IOC reports with MITRE ATT&CK TTP mapping per sample</li>
    </ul>`
  },
  {
    id: '4',
    name: 'Network Traffic Analyzer',
    job_config: {
      title: 'Real-time packet capture engine with OT protocol fingerprinting for Modbus TCP, DNP3, and IEC 104.',
      requirements: [],
      required_skills: ['Python', 'Scapy', 'Flask', 'SQLite', 'Chart.js', 'Npcap', 'aiohttp'],
      experience_years: 1,
      education_level: 'Bachelor'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-03-01T10:00:00Z',
    updated_at: '2025-03-01T10:00:00Z',
    start_date: '2025',
    end_date: '2026',
    category: 'Network',
    github_link: 'https://github.com/Lohith115/Network-Traffic-Analyzer-OT-ICS-Protocol-Detection',
    detailed_description: `<ul>
      <li>Real-time packet capture using Scapy in daemon thread with queue-based pipeline (thread-safe, BPF filter support)</li>
      <li>OT/ICS protocol fingerprinting for Modbus TCP (502), DNP3 (20000), and IEC 104 (2404)</li>
      <li>5-tuple TCP/UDP session tracking with FIN/RST detection for session lifecycle management</li>
      <li>Thread-safe SQLite backend (WAL mode) with UPSERT for protocol stats aggregation</li>
      <li>Top talkers analysis using CTE UNION ALL query aggregating bytes as source AND destination</li>
      <li>Real-time dashboard with protocol distribution chart and bandwidth visualization</li>
    </ul>`
  },
  {
    id: '5',
    name: 'Threat Intelligence Aggregator',
    job_config: {
      title: 'Multi-source threat intel pipeline aggregating IP, domain, and hash reputation from AbuseIPDB, VirusTotal, Shodan, and AlienVault OTX with unified scoring and SOC-ready recommendations.',
      requirements: [],
      required_skills: ['Python', 'Flask', 'SQLite', 'AbuseIPDB API', 'VirusTotal API', 'Shodan API', 'AlienVault OTX API'],
      experience_years: 1,
      education_level: 'Bachelor'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-03-10T10:00:00Z',
    updated_at: '2025-03-10T10:00:00Z',
    start_date: '2026',
    end_date: '2026',
    category: 'Cybersecurity',
    github_link: 'https://github.com/Lohith115/Threat-Intelligence-Aggregator',
    detailed_description: `<ul>
      <li>Aggregates threat intelligence from 4 sources: AbuseIPDB, VirusTotal, Shodan, and AlienVault OTX</li>
      <li>Supports IP address, domain name, and file hash (MD5/SHA1/SHA256) investigation</li>
      <li>Weighted scoring engine: AbuseIPDB +40, VirusTotal +30, AlienVault OTX +20, Shodan +10</li>
      <li>Verdicts: MALICIOUS (≥70) / SUSPICIOUS (≥40) / LOW RISK (≥10) / CLEAN (0)</li>
      <li>24-hour SQLite cache prevents API rate limit exhaustion</li>
      <li>SOC-ready recommendations per verdict (5 action steps for MALICIOUS, 4 for SUSPICIOUS)</li>
      <li>Tested: EICAR hash → MALICIOUS 100/100, 8.8.8.8 → CLEAN 0/100</li>
    </ul>`
  },
  {
    id: '6',
    name: 'Web Vulnerability Scanner',
    job_config: {
      title: 'Async OWASP Top 10 scanner testing SQLi, XSS, open redirects, path traversal, security headers, and sensitive file disclosure with HTML and JSON report output.',
      requirements: [],
      required_skills: ['Python', 'aiohttp', 'asyncio', 'BeautifulSoup4', 'Flask', 'lxml', 'OWASP Top 10'],
      experience_years: 1,
      education_level: 'Bachelor'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-03-15T10:00:00Z',
    updated_at: '2025-03-15T10:00:00Z',
    start_date: '2026',
    end_date: '2026',
    category: 'Cybersecurity',
    github_link: 'https://github.com/Lohith115/Web-Vulnerability-Scanner',
    detailed_description: `<ul>
      <li>Async Python scanner using aiohttp and asyncio.gather() — all checks run concurrently, not sequentially</li>
      <li>6 vulnerability checks: SQL Injection, XSS (reflected), Open Redirects, Security Headers, Sensitive File Disclosure (18 paths), Path Traversal</li>
      <li>OWASP Top 10 coverage: A01 (Access Control), A03 (Injection), A05 (Misconfiguration)</li>
      <li>Safe mode default: disables SQLi and path traversal for passive-only auditing</li>
      <li>Crawls target up to configurable depth, extracts all URLs and HTML forms</li>
      <li>Real scan result: 451 findings (100 HIGH, 50 MEDIUM, 301 LOW) on test target</li>
      <li>Generates timestamped HTML and JSON reports per scan</li>
    </ul>`
  }
]

export const getMockProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), 800)
  })
}

export const createMockProject = (name: string, jobConfig: any): Promise<Project> => {
  const newProject: Project = {
    id: Date.now().toString(),
    name,
    job_config: jobConfig,
    resume_ids: [],
    status: 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    start_date: 'Today',
    end_date: 'Ongoing',
    category: 'Cybersecurity'
  }
  mockProjects.unshift(newProject)
  return Promise.resolve(newProject)
}

export const deleteMockProject = (id: string): Promise<void> => {
  const index = mockProjects.findIndex(p => p.id === id)
  if (index > -1) {
    mockProjects.splice(index, 1)
  }
  return Promise.resolve()
}
