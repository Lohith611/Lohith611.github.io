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
      title: 'Live Deployed Honeypot for ICS Threat Research',
      requirements: [],
      required_skills: ['Python', 'PyModbus', 'Flask', 'Docker', 'OVHcloud'],
      experience_years: 1,
      education_level: 'Master'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
    start_date: 'Aug 2024',
    end_date: 'Present',
    category: 'OT/ICS',
    detailed_description: `<ul><li>Live on public VPS, actively collecting real attacker sessions. 3 virtual PLCs (conveyor, hydraulic pump, heater) with physics-based register simulation.</li><li>13 MITRE ATT&CK for ICS detection rules; real-time Flask dashboard with geo-mapped IPs, PLC topology, and per-attacker threat scoring.</li></ul>`
  },
  {
    id: '2',
    name: 'OT/ICS SIEM Dashboard',
    job_config: {
      title: 'SIEM for Industrial Control Systems',
      requirements: [],
      required_skills: ['Python', 'Flask', 'SQLite', 'Chart.js', 'Leaflet.js'],
      experience_years: 1,
      education_level: 'Master'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-02-01T10:00:00Z',
    updated_at: '2025-02-01T10:00:00Z',
    start_date: '2024',
    end_date: '2025',
    category: 'Cybersecurity',
    detailed_description: `<ul><li>Production SIEM ingesting SSH, Apache/Nginx, and SCADA logs with correlation rules, MITRE ATT&CK mapper, and automated IR playbook generator.</li></ul>`
  },
  {
    id: '3',
    name: 'Malware Analysis Lab',
    job_config: {
      title: 'Isolated Lab for Malware Research',
      requirements: [],
      required_skills: ['FlareVM', 'REMnux', 'PEStudio', 'Wireshark', 'YARA'],
      experience_years: 1,
      education_level: 'Bachelor'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-02-15T10:00:00Z',
    updated_at: '2025-02-15T10:00:00Z',
    start_date: '2024',
    end_date: '2024',
    category: 'Malware',
    detailed_description: `<ul><li>Static and Dynamic analysis of real malware samples from MalwareBazaar; authored YARA detection rules per MITRE ATT&CK TTP mapping.</li></ul>`
  },
  {
    id: '4',
    name: 'Network Traffic Analyzer',
    job_config: {
      title: 'Protocol Fingerprinting and Traffic Analysis',
      requirements: [],
      required_skills: ['Python', 'Scapy', 'Flask', 'SQLite', 'Chart.js'],
      experience_years: 1,
      education_level: 'Bachelor'
    },
    resume_ids: [],
    status: 'completed',
    created_at: '2025-03-01T10:00:00Z',
    updated_at: '2025-03-01T10:00:00Z',
    start_date: '2024',
    end_date: '2024',
    category: 'Network',
    detailed_description: `<ul><li>Real-time packet capture engine with OT protocol fingerprinting for Modbus TCP, DNP3, and IEC 104.</li></ul>`
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
