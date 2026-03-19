<template>
  <div class="animated-background">
    <!-- Grid Pattern -->
    <div class="grid-pattern"></div>

    <!-- Moving Circles -->
    <div class="shape circle circle-1"></div>
    <div class="shape circle circle-2"></div>
    <div class="shape circle circle-3"></div>
    <div class="shape circle circle-4"></div>
    <div class="shape circle circle-5"></div>

    <!-- Moving Squares -->
    <div class="shape square square-1"></div>
    <div class="shape square square-2"></div>
    <div class="shape square square-3"></div>
    <div class="shape square square-4"></div>

    <!-- Gradient Overlay -->
    <div class="gradient-overlay"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  background: var(--bg-primary);
  transition: background 0.3s ease;
}

:root.dark-mode .animated-background {
  background: #1a1a1a;
}
// Grid Pattern - DARKER
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

:root.dark-mode .grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
}
// Base Shape Styles - WITH SHADOWS
.shape {
  position: absolute;
  opacity: 0.2;
  border: 3px solid rgba(0, 0, 0, 0.2);
  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.15);
}

// Circles - COLORFUL
.circle {
  border-radius: 50%;
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 5%;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  animation: float1 25s ease-in-out infinite;
}

.circle-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  left: 80%;
  background: linear-gradient(135deg, #FF6B6B, #FF4757);
  animation: float2 20s ease-in-out infinite;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 75%;
  left: 10%;
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  animation: float3 30s ease-in-out infinite;
}

.circle-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  left: 70%;
  background: linear-gradient(135deg, #A8E6CF, #56C596);
  animation: float4 22s ease-in-out infinite;
}

.circle-5 {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  background: linear-gradient(135deg, #C77DFF, #9D4EDD);
  animation: float5 18s ease-in-out infinite;
}

// Squares - COLORFUL
.square {
  transform: rotate(45deg);
}

.square-1 {
  width: 100px;
  height: 100px;
  top: 15%;
  left: 85%;
  background: linear-gradient(135deg, #FFB6C1, #FF69B4);
  animation: float1 28s ease-in-out infinite, rotate1 15s linear infinite;
}

.square-2 {
  width: 70px;
  height: 70px;
  top: 45%;
  left: 15%;
  background: linear-gradient(135deg, #87CEEB, #4682B4);
  animation: float2 24s ease-in-out infinite, rotate2 12s linear infinite;
}

.square-3 {
  width: 90px;
  height: 90px;
  top: 80%;
  left: 75%;
  background: linear-gradient(135deg, #FFE66D, #FFC233);
  animation: float3 26s ease-in-out infinite, rotate1 18s linear infinite;
}

.square-4 {
  width: 110px;
  height: 110px;
  top: 5%;
  left: 40%;
  background: linear-gradient(135deg, #98D8C8, #6BCF7F);
  animation: float4 30s ease-in-out infinite, rotate2 20s linear infinite;
}

// Gradient Overlay
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 220, 150, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(150, 180, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 180, 100, 0.08) 0%, transparent 60%);
  animation: gradientPulse 10s ease-in-out infinite;
}

// Floating Animations
@keyframes float1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 40px) scale(0.9);
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-40px, 30px) scale(1.15);
  }
  66% {
    transform: translate(25px, -35px) scale(0.85);
  }
}

@keyframes float3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, 45px) scale(0.95);
  }
  66% {
    transform: translate(-35px, -25px) scale(1.08);
  }
}

@keyframes float4 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-25px, -40px) scale(1.12);
  }
  66% {
    transform: translate(40px, 30px) scale(0.88);
  }
}

@keyframes float5 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-50px, 50px) scale(1.2);
  }
}

// Rotation Animations for Squares
@keyframes rotate1 {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(-315deg);
  }
}

// Gradient Pulse
@keyframes gradientPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>