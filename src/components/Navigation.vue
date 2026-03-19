<template>
  <header class="navigation">
    <div class="logo" @click="$emit('navigate', 'home')">
      <span class="logo-text">T LOHITH</span>
    </div>
    <nav class="nav">
      <a
        v-for="page in pages"
        :key="page.id"
        @click="$emit('navigate', page.id)"
        :class="['nav-link', { active: currentPage === page.id }]"
      >
        {{ page.label }}
      </a>
    </nav>
    <div class="header-actions">
      <button class="icon-btn" @click="toggleTheme" title="Toggle Theme">
        <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  currentPage: string
}>()

defineEmits<{
  (e: 'navigate', page: string): void
}>()

const pages = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'blogs', label: 'BLOGS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'certificates', label: 'CERTIFICATES' },
  { id: 'contact', label: 'CONTACT' }
]

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark-mode', isDark.value)
}
</script>

<style scoped lang="scss">
.navigation {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  background: var(--bg-secondary);
  border: 4px solid var(--border-color);
  border-radius: 20px;
  margin: 20px;
  box-shadow: 8px 8px 0 var(--border-color);
  transition: all 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  .logo-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border: 3px solid var(--border-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 1px;
  }
}

.nav {
  display: flex;
  gap: 30px;

  .nav-link {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.5px;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s;

    &.active {
      background: #4A90E2;
      color: white;
    }

    &:hover {
      background: #FFD700;
      color: #000;
    }
  }
}

.header-actions {
  display: flex;
  gap: 10px;

  .icon-btn {
    width: 45px;
    height: 45px;
    border: 3px solid var(--border-color);
    border-radius: 10px;
    background: var(--bg-secondary);
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    svg {
      width: 22px;
      height: 22px;
      color: var(--text-primary);
    }

    &:hover {
      background: #FFD700;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      svg {
        color: #000;
      }
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>