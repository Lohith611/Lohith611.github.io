<template>
  <button class="chat-button" @click="$emit('open-chat')" title="Ask me anything!">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span class="pulse-dot"></span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'open-chat'): void
}>()
</script>

<style scoped lang="scss">
.chat-button {
  position: fixed;
  bottom: 120px;
  right: 40px;
  width: 65px;
  height: 65px;
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  border: 4px solid #000;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 6px 6px 0 #000;
  transition: all 0.3s ease;
  z-index: 1000;

  svg {
    width: 32px;
    height: 32px;
    color: white;
  }

  &:hover {
    transform: translate(-3px, -3px) scale(1.05);
    box-shadow: 9px 9px 0 #000;
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 4px 4px 0 #000;
  }
}

.pulse-dot {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  background: #FF6B6B;
  border: 3px solid #000;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>