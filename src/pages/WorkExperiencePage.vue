<template>
  <div class="experience-page">
    <div class="page-container">
      <h1 class="page-title">Work Experience</h1>

      <div class="timeline">
        <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="experience-card">
              <div class="exp-header">
                <div class="exp-meta">
                  <span class="duration">{{ exp.duration }}</span>
                </div>
              </div>

              <h3 class="position">{{ exp.position }}</h3>
              <h4 class="company">{{ exp.company }}</h4>

              <ul class="responsibilities">
                <li v-for="(responsibility, index) in exp.responsibilities" :key="index">
                  {{ responsibility }}
                </li>
              </ul>

              <div class="skills-used" v-if="exp.skills.length > 0">
                <span v-for="skill in exp.skills" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrollToTop from '../components/ScrollToTop.vue'

interface Experience {
  id: number
  position: string
  company: string
  duration: string
  responsibilities: string[]
  skills: string[]
}

const experiences = ref<Experience[]>([
  {
    id: 1,
    position: 'Ethical Hacking Intern',
    company: 'InLighnX Global Pvt. Ltd.',
    duration: 'Jul-Aug 2025',
    responsibilities: [
      'Developed Python keylogger (keystroke capture, screenshot exfiltration, registry persistence, .exe packaging) simulating red team malware',
      'Performed command injection attacks on DVWA/bWAPP with reverse shell execution via Netcat'
    ],
    skills: ['Python', 'Ethical Hacking', 'Malware Simulation', 'Command Injection', 'Netcat']
  },
  {
    id: 2,
    position: 'Full Stack Python Developer Intern',
    company: 'Aavanto Pvt. Ltd.',
    duration: 'Oct-Dec 2023',
    responsibilities: [
      'Built data visualization modules for smart grid analytics platform using Python and Flask',
      'Contributed to IoT energy automation modules'
    ],
    skills: ['Python', 'Flask', 'Data Visualization', 'IoT', 'Smart Grid Analytics']
  }
])
</script>

<style scoped lang="scss">
.experience-page {
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
  color: var(--text-primary);
  margin: 0 0 60px 0;
  text-align: center;
  text-shadow: 4px 4px 0 #FFD700;
}

.timeline {
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--border-color);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-dot {
  position: absolute;
  left: -38px;
  top: 25px;
  width: 20px;
  height: 20px;
  background: #FFD700;
  border: 4px solid var(--border-color);
  border-radius: 50%;
  z-index: 1;
}

.experience-card {
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 8px 8px 0 #000;
  transition: all 0.3s;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000;
  }
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.company-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #87CEEB, #4A90E2);
  border: 3px solid #000;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
}

.exp-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .duration {
    padding: 8px 16px;
    background: #FFD700;
    border: 3px solid #000;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    color: #000;
  }
}

.position {
  font-size: 26px;
  font-weight: 800;
  color: #000;
  margin: 0 0 8px 0;
}

.company {
  font-size: 18px;
  font-weight: 700;
  color: #4A90E2;
  margin: 0 0 25px 0;
}

.responsibilities {
  margin: 0 0 25px 0;
  padding-left: 20px;
  list-style-type: disc;

  li {
    margin: 12px 0;
    font-size: 15px;
    line-height: 1.7;
    color: #333;
  }
}

.skills-used {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 3px solid #f0f0f0;
}

.skill-tag {
  padding: 8px 14px;
  background: #FFE88C;
  border: 3px solid #000;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #000;
}

@media (max-width: 768px) {
  .experience-page {
    padding: 40px 20px;
  }

  .timeline {
    padding-left: 30px;

    &::before {
      left: 10px;
    }
  }

  .timeline-dot {
    left: -28px;
  }

  .experience-card {
    padding: 25px;
  }

  .exp-header {
    flex-direction: column;
    gap: 15px;
  }

  .exp-meta {
    align-items: flex-start;
  }
}
</style>