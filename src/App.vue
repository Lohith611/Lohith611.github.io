<template>
  <div id="app">
    <AnimatedBackground />
    <el-config-provider :locale="locale">
      <Navigation :current-page="currentPage" @navigate="navigateTo" />

      <transition name="page" mode="out-in">
        <HomePage v-if="currentPage === 'home'" @navigate="navigateTo" />
        <AboutPage v-else-if="currentPage === 'about'" />
        <ProjectsPage v-else-if="currentPage === 'projects'" />
        <BlogsPage v-else-if="currentPage === 'blogs'" />
        <WorkExperiencePage v-else-if="currentPage === 'experience'" />
        <EducationPage v-else-if="currentPage === 'education'" />
        <CertificatesPage v-else-if="currentPage === 'certificates'" />
        <ContactPage v-else-if="currentPage === 'contact'" />
      </transition>

      <!-- ChatBot -->
      <ChatButton @open-chat="isChatOpen = true" />
      <ChatBot :is-open="isChatOpen" @close-chat="isChatOpen = false" />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import enUS from 'element-plus/es/locale/lang/en'
import AnimatedBackground from './components/AnimatedBackground.vue'
import Navigation from './components/Navigation.vue'
import ChatButton from './components/ChatButton.vue'
import ChatBot from './components/ChatBot.vue'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import BlogsPage from './pages/BlogsPage.vue'
import WorkExperiencePage from './pages/WorkExperiencePage.vue'
import EducationPage from './pages/EducationPage.vue'
import CertificatesPage from './pages/CertificatesPage.vue'
import ContactPage from './pages/ContactPage.vue'

const locale = ref(enUS)
const currentPage = ref('home')
const isChatOpen = ref(false)

function navigateTo(page: string) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Light Mode (Default) */
:root {
  --bg-primary: #f8f4ed;
  --bg-secondary: #ffffff;
  --text-primary: #000000;
  --text-secondary: #333333;
  --border-color: #000000;
  --shadow-color: rgba(0, 0, 0, 0.15);
}

/* Dark Mode - Applied dynamically via JavaScript */
:root.dark-mode {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --border-color: #ffffff;
  --shadow-color: rgba(255, 255, 255, 0.1);
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
  transition: background-color 0.3s ease;
}

/* Vue transition classes - applied dynamically */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>