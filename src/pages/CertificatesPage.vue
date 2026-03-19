<template>
  <div class="certificates-page">
    <div class="page-container">
      <h1 class="page-title">Certifications</h1>

      <div class="certificates-grid">
        <div
          v-for="cert in certificates"
          :key="cert.id"
          class="certificate-card"
          @click="openCertificate(cert.link)"
        >
          <div class="cert-content">
            <h3 class="cert-title">{{ cert.title }}</h3>
            <p class="cert-issuer">{{ cert.issuer }}</p>
            <p class="cert-date" v-if="cert.date">{{ cert.date }}</p>

            <button class="view-cert-btn">
              View Details
            </button>
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

interface Certificate {
  id: number
  title: string
  issuer: string
  date?: string
  link: string
}

const certificates = ref<Certificate[]>([
  {
    id: 1,
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Coursera / Google',
    date: 'Feb 2026',
    link: 'https://www.coursera.org/professional-certificates/google-cybersecurity'
  },
  {
    id: 2,
    title: 'CompTIA Security+',
    issuer: 'CompTIA (In Progress)',
    date: '2026',
    link: 'https://www.comptia.org/certifications/security'
  }
])

function openCertificate(link: string) {
  window.open(link, '_blank')
}
</script>

<style scoped lang="scss">
.certificates-page {
  position: relative;
  z-index: 1;
  padding: 60px;
  min-height: calc(100vh - 200px);
}

.page-container {
  max-width: 1400px;
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

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.certificate-card {
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 8px 8px 0 #000;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000;
  }
}

.cert-content {
  width: 100%;
}

.cert-title {
  font-size: 22px;
  font-weight: 800;
  color: #000;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.cert-issuer {
  font-size: 16px;
  font-weight: 700;
  color: #4A90E2;
  margin: 0 0 8px 0;
}

.cert-date {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin: 0 0 25px 0;
}

.view-cert-btn {
  width: 100%;
  padding: 14px;
  background: #4A90E2;
  border: 4px solid #000;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;

  &:hover {
    background: #357ABD;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .certificates-page {
    padding: 40px 20px;
  }

  .certificates-grid {
    grid-template-columns: 1fr;
  }
}
</style>
