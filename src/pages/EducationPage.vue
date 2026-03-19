<template>
  <div class="education-page">
    <div class="page-container">
      <h1 class="page-title">Education</h1>

      <div class="timeline">
        <div v-for="edu in education" :key="edu.id" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="education-card">
              <div class="edu-header">
                <div class="edu-meta">
                  <span class="duration">{{ edu.duration }}</span>
                </div>
              </div>

              <h3 class="university-name">{{ edu.university }}</h3>
              <p class="location">{{ edu.location }}</p>

              <p class="description">{{ edu.description }}</p>

              <div class="degree-info">
                <h4 class="degree">{{ edu.degree }}</h4>
                <div class="cgpa-badge">
                  <span class="cgpa-label">Degree:</span>
                  <span class="cgpa-value">{{ edu.cgpa }}</span>
                </div>
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

interface Education {
  id: number
  university: string
  location: string
  degree: string
  cgpa: string
  duration: string
  description: string
}

const education = ref<Education[]>([
  {
    id: 1,
    university: 'Amity University Gurugram',
    location: 'Gurgaon, India',
    degree: 'M.Tech - Networks & Cybersecurity',
    cgpa: 'M.Tech',
    duration: 'Aug 2024 - June 2026 (Expected)',
    description: 'Focusing on OT/ICS Modbus TCP Honeypot with Graduated Response & MITRE ATT&CK Detection.'
  },
  {
    id: 2,
    university: 'Siddharth Institute of Engineering & Technology',
    location: 'Tirupati, India',
    degree: 'B.Tech - Cybersecurity, IoT & Blockchain',
    cgpa: 'B.Tech',
    duration: 'Aug 2019 - May 2024',
    description: 'Undergraduate studies in cybersecurity fundamentals, internet of things, and blockchain technology.'
  }
])
</script>

<style scoped lang="scss">
.education-page {
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

.education-card {
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

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.university-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #FFE88C, #FFD700);
  border: 3px solid #000;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
}

.edu-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .duration {
    padding: 8px 16px;
    background: #4A90E2;
    border: 3px solid #000;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    color: white;
  }
}

.university-name {
  font-size: 26px;
  font-weight: 800;
  color: #000;
  margin: 0 0 8px 0;
}

.location {
  font-size: 15px;
  font-weight: 600;
  color: #666;
  margin: 0 0 15px 0;
}

.description {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  margin: 0 0 20px 0;
  font-style: italic;
}

.degree-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 3px solid #f0f0f0;
}

.degree {
  font-size: 18px;
  font-weight: 700;
  color: #4A90E2;
  margin: 0;
}

.cgpa-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #90EE90;
  border: 3px solid #000;
  border-radius: 12px;

  .cgpa-label {
    font-size: 14px;
    font-weight: 700;
    color: #006400;
  }

  .cgpa-value {
    font-size: 20px;
    font-weight: 900;
    color: #006400;
  }
}

@media (max-width: 768px) {
  .education-page {
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

  .education-card {
    padding: 25px;
  }

  .degree-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>