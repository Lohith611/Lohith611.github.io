<template>
  <transition name="fade">
    <button v-if="isVisible" class="scroll-to-top" @click="scrollToTop" title="Scroll to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

function checkScroll() {
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped lang="scss">
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 55px;
  height: 55px;
  background: linear-gradient(135deg, #A8E6CF, #56C596);
  border: 4px solid #000;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 6px 6px 0 #000;
  transition: all 0.3s ease;
  z-index: 1000;

  svg {
    width: 28px;
    height: 28px;
    color: #000;
  }

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 #000;
    background: linear-gradient(135deg, #90EE90, #3CB371);
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 4px 4px 0 #000;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>