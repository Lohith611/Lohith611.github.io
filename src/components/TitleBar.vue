<template>
  <div class="title-bar">
    <!-- Left side: Traffic lights + back button -->
    <div class="title-bar-left">
      <!-- macOS traffic lights (red, yellow, green) -->
      <div class="traffic-lights" @mouseenter="trafficHover = true" @mouseleave="trafficHover = false">
        <button class="light close" @click="closeWindow" title="Close">
          <svg v-if="trafficHover" viewBox="0 0 12 12"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="rgba(0,0,0,0.6)" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>
        </button>
        <button class="light minimize" @click="minimizeWindow" title="Minimize">
          <svg v-if="trafficHover" viewBox="0 0 12 12"><rect x="2" y="5.5" width="8" height="1" rx="0.5" fill="rgba(0,0,0,0.6)"/></svg>
        </button>
        <button class="light maximize" @click="maximizeWindow" title="Maximize">
          <svg v-if="trafficHover" viewBox="0 0 12 12"><path d="M3.5 8.5V3.5H8.5V8.5H3.5Z" stroke="rgba(0,0,0,0.5)" stroke-width="1" fill="none"/></svg>
        </button>
      </div>

      <!-- Back button -->
      <button v-if="showBack" class="back-btn" @click="handleBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>{{ backText || '' }}</span>
      </button>
    </div>

    <!-- Center: Title -->
    <div class="title-bar-center">
      <span class="title-text">{{ title }}</span>
    </div>

    <!-- Right side: Custom actions area -->
    <div class="title-bar-right">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props definition
withDefaults(defineProps<{
  title?: string
  showBack?: boolean
  backText?: string
}>(), {
  title: 'Portfolio',
  showBack: false,
  backText: ''
})

// Emits definition
const emit = defineEmits<{
  (e: 'back'): void
}>()

// State
const trafficHover = ref(false)

// Methods
function handleBack() {
  emit('back')
  window.history.back()
}

function closeWindow() {
  console.log('Close window')
}

function minimizeWindow() {
  console.log('Minimize window')
}

function maximizeWindow() {
  console.log('Maximize window')
}
</script>

<style scoped lang="scss">
@import '../styles/macos-theme.scss';

.title-bar {
  display: flex;
  align-items: center;
  height: $titlebar-height;
  background: $bg-titlebar;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid $separator;
  user-select: none;
  position: relative;
  z-index: 1000;
  font-family: $font-family;
}

// Left area
.title-bar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 14px;
  min-width: 160px;
}

// macOS traffic light buttons
.traffic-lights {
  display: flex;
  gap: 8px;
  padding: 0 4px;

  .light {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity $transition-fast;
    padding: 0;

    svg {
      width: 8px;
      height: 8px;
    }

    &.close {
      background: #FF5F57;
    }

    &.minimize {
      background: #FEBC2E;
    }

    &.maximize {
      background: #28C840;
    }
  }
}

// Back button (macOS style)
.back-btn {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border: none;
  border-radius: $radius-sm;
  background: transparent;
  color: $system-blue;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition: background $transition-fast;

  &:hover {
    background: $system-blue-light;
  }

  svg {
    width: 18px;
    height: 18px;
  }
}

// Center title (centered)
.title-bar-center {
  flex: 1;
  text-align: center;

  .title-text {
    font-size: 13px;
    font-weight: 600;
    color: $text-primary;
    letter-spacing: -0.01em;
  }
}

// Right actions area
.title-bar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
  min-width: 160px;
  justify-content: flex-end;
}
</style>