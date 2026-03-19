<template>
  <div class="dev-panel">
    <button class="panel-toggle" @click="isOpen = !isOpen">
      {{ isOpen ? '✕' : '⚙️' }}
    </button>

    <transition name="slide">
      <div v-if="isOpen" class="panel-content">
        <h3>Admin Panel</h3>

        <div class="panel-section">
          <h4>📬 Messages Inbox</h4>
          <button class="admin-btn" @click="openMessages">
            View Messages
            <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
          </button>
        </div>

        <div class="panel-section">
          <h4>🎨 Theme</h4>
          <button class="admin-btn" @click="toggleTheme">
            {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
          </button>
        </div>

        <div class="panel-section">
          <h4>📊 Stats</h4>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-label">Total Messages:</span>
              <span class="stat-value">{{ totalMessages }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Unread:</span>
              <span class="stat-value">{{ unreadCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMessagesStore } from '../composables/useMessagesStore'

const emit = defineEmits<{
  (e: 'navigate', page: string): void
}>()

const isOpen = ref(false)
const isDark = ref(false)
const messagesStore = useMessagesStore()

const unreadCount = computed(() => messagesStore.getUnreadCount())
const totalMessages = computed(() => messagesStore.messages.length)

function openMessages() {
  emit('navigate', 'messages')
  isOpen.value = false
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark-mode', isDark.value)
}

onMounted(() => {
  messagesStore.loadMessages()
})
</script>

<style scoped lang="scss">
.dev-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.panel-toggle {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #FF6B6B, #FF4757);
  border: 4px solid #000;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 4px 4px 0 #000;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
}

.panel-content {
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  background: white;
  border: 4px solid #000;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 8px 8px 0 #000;

  h3 {
    font-size: 20px;
    font-weight: 800;
    color: #000;
    margin: 0 0 20px 0;
    text-align: center;
  }
}

.panel-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 3px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #666;
    margin: 0 0 10px 0;
  }
}

.admin-btn {
  width: 100%;
  padding: 12px 16px;
  background: #4A90E2;
  border: 3px solid #000;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #357ABD;
    transform: translateY(-2px);
  }
}

.badge {
  background: #FF6B6B;
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
  border: 2px solid #000;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f5f5f5;
  border: 2px solid #000;
  border-radius: 8px;

  .stat-label {
    font-size: 13px;
    font-weight: 600;
    color: #666;
  }

  .stat-value {
    font-size: 14px;
    font-weight: 800;
    color: #000;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>