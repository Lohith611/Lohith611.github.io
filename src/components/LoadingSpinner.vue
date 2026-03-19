<template>
  <div class="loading-container">
    <div class="loading-spinner">
      <div class="spinner-square">
        <div class="spinner-circle"></div>
      </div>
    </div>
    <div class="loading-text">LOADING...</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.loading-spinner {
  margin-bottom: 20px;
}

.spinner-square {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFE88C, #FFD700);
  border: 4px solid #000;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 2s linear infinite;
  position: relative;
}

.spinner-circle {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  border: 3px solid #000;
  border-radius: 50%;
  animation: pulse 1s ease-in-out infinite;
}

.loading-text {
  font-size: 18px;
  font-weight: 800;
  color: #000;
  letter-spacing: 3px;
  background: white;
  padding: 12px 24px;
  border: 4px solid #000;
  border-radius: 10px;
  box-shadow: 4px 4px 0 #000;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
}
</style>