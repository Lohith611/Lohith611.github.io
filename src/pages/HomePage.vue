<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Hi, I'm <span class="highlight animated-name">T LOHITH</span>
        </h1>
        <p class="hero-subtitle">
          <span class="typing-text">{{ currentTitle }}</span>
          <span class="cursor">|</span>
        </p>
        <p class="hero-description">
          M.Tech Cybersecurity candidate specializing in OT/ICS security and Blue Team operations — including a live-deployed Modbus TCP honeypot and a production SIEM with ML anomaly detection.
        </p>
        <div class="hero-buttons">
          <button class="primary-btn" @click="$emit('navigate', 'projects')">
            View My Work
          </button>
          <button class="secondary-btn" @click="$emit('navigate', 'contact')">
            Get In Touch
          </button>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-placeholder">
          <img v-if="profileImage" :src="profileImage" alt="T Lohith" />
          <div v-else class="placeholder-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits<{
  (e: 'navigate', page: string): void
}>()

const profileImage = ref('')
const currentTitle = ref('')
const titles = ['Cybersecurity Engineer', 'OT/ICS & Blue Team Security', 'SOC Analyst']
let currentIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimeout: ReturnType<typeof setTimeout> | null = null

function typeEffect() {
  const currentFullTitle = titles[currentIndex]

  if (isDeleting) {
    // Erase letter by letter
    currentTitle.value = currentFullTitle.substring(0, charIndex - 1)
    charIndex--

    if (charIndex === 0) {
      isDeleting = false
      currentIndex = (currentIndex + 1) % titles.length
      typingTimeout = setTimeout(typeEffect, 500)
    } else {
      typingTimeout = setTimeout(typeEffect, 100)
    }
  } else {
    // Type letter by letter
    currentTitle.value = currentFullTitle.substring(0, charIndex + 1)
    charIndex++

    if (charIndex === currentFullTitle.length) {
      isDeleting = true
      typingTimeout = setTimeout(typeEffect, 2000) // Wait 2 seconds
    } else {
      typingTimeout = setTimeout(typeEffect, 150)
    }
  }
}

onMounted(() => {
  typeEffect()
})

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
})
</script>

<style scoped lang="scss">
.home-page {
  position: relative;
  z-index: 1;
  padding: 60px;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1400px;
  width: 100%;
}

.hero-content {
  .hero-title {
    font-size: 56px;
    font-weight: 900;
    color: var(--text-primary);
    margin: 0 0 20px 0;
    line-height: 1.2;

    .highlight {
      color: #4A90E2;
      text-shadow: 3px 3px 0 #FFD700;
    }

    .animated-name {
      display: inline-block;
      animation: bounceIn 1s ease-out;
    }
  }

  .hero-subtitle {
    font-size: 32px;
    font-weight: 700;
    color: #FF6B6B;
    margin: 0 0 25px 0;
    min-height: 45px;
    display: flex;
    align-items: center;

    .typing-text {
      display: inline-block;
    }

    .cursor {
      display: inline-block;
      margin-left: 3px;
      animation: blink 0.7s infinite;
      color: #FF6B6B;
      font-weight: 400;
    }
  }

  .hero-description {
    font-size: 18px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin: 0 0 40px 0;
  }
}

.hero-buttons {
  display: flex;
  gap: 20px;

  button {
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 700;
    border: 4px solid var(--border-color);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 var(--border-color);
    }
  }

  .primary-btn {
    background: #4A90E2;
    color: white;
  }

  .secondary-btn {
    background: #FFD700;
    color: #000;
  }
}

.hero-image {
  display: flex;
  justify-content: center;

  .image-placeholder {
    width: 400px;
    height: 400px;
    background: var(--bg-secondary);
    border: 6px solid var(--border-color);
    border-radius: 30px;
    box-shadow: 12px 12px 0 var(--border-color);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: floatImage 6s ease-in-out infinite;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder-icon {
      font-size: 120px;
    }
  }
}
// Animations
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-100px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes floatImage {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>