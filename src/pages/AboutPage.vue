<template>
  <div class="about-page">
    <div class="page-container">
      <h1 class="page-title">About Me</h1>

      <div class="about-content">
        <div class="about-text">
          <p>
            Hello! I'm <strong>T Lohith</strong>, a Cybersecurity Engineer passionate about OT/ICS security and Blue Team operations.
          </p>
          <p>
            I specialize in SOC/SIEM (Splunk, Microsoft Sentinel), OT/ICS security (Modbus TCP, SCADA architecture), malware analysis, and network security. I am dedicated to protecting critical infrastructure and detecting advanced threats.
          </p>
          <p>
            Currently, I am pursuing my M.Tech in Networks & Cybersecurity at Amity University Gurugram, where I am working on a live-deployed Modbus TCP honeypot for ICS threat research.
          </p>

          <div class="skills-section">
            <h3>Skills & Technologies</h3>
            <div class="skills-grid">
              <div class="skill-badge" v-for="skill in skills" :key="skill">{{ skill }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  'Splunk', 'Microsoft Sentinel', 'ELK Stack', 'SOC/SIEM',
  'Modbus TCP', 'DNP3', 'IEC 104', 'SCADA Architecture',
  'MITRE ATT&CK for ICS', 'FlareVM', 'REMnux', 'YARA Rule Writing',
  'Wireshark', 'Nmap', 'Scapy', 'Snort/Suricata',
  'VLAN Segmentation', '802.11 Wireless Security', 'Metasploit', 'Burp Suite',
  'Python (Advanced)', 'Flask', 'Docker', 'REST APIs'
]
</script>

<style scoped lang="scss">
.about-page {
  position: relative;
  z-index: 1;
  padding: 60px;
  min-height: calc(100vh - 200px);
}

.page-container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 48px;
  font-weight: 900;
  color: #000;
  margin: 0 0 40px 0;
  text-align: center;
  text-shadow: 4px 4px 0 #FFD700;
}

.about-content {
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 12px 12px 0 #000;
}

.about-text {
  p {
    font-size: 18px;
    line-height: 1.8;
    color: #333;
    margin-bottom: 20px;

    strong {
      color: #4A90E2;
      font-weight: 700;
    }
  }
}

.skills-section {
  margin-top: 40px;

  h3 {
    font-size: 24px;
    font-weight: 800;
    color: #000;
    margin-bottom: 20px;
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.skill-badge {
  padding: 12px 20px;
  background: #FFE88C;
  border: 3px solid #000;
  border-radius: 10px;
  font-weight: 700;
  text-align: center;
  transition: all 0.2s;
  cursor: default;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #000;
  }
}
</style>