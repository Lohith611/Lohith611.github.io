<template>
  <div class="portfolio-page">
    <header class="header">
      <div class="logo">
        <div class="logo-icon"></div>
        <span class="logo-text">My Portfolio</span>
      </div>
      <nav class="nav">
        <a href="#" class="nav-link active">HOME</a>
        <a href="#projects" class="nav-link">PROJECTS</a>
        <a href="#blog" class="nav-link">BLOG</a>
        <a href="#contact" class="nav-link">CONTACT</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn"></button>
        <button class="icon-btn"></button>
      </div>
    </header>

    <main class="main-content">
      <div class="projects-grid">
        <div
          v-for="project in projectStore.projects"
          :key="project.id"
          class="project-card-wrapper"
        >
          <div class="project-card">
            <div class="card-header">
              <div class="project-icon">
                {{ getProjectIcon(project.name) }}
              </div>
              <div class="card-header-content">
                <h2 class="project-title">{{ project.name }}</h2>
                <p class="project-version">{{ project.status }}</p>
              </div>
            </div>

            <p class="project-description">{{ project.job_config.title }}</p>

            <div class="project-stats">
              <div class="stat-badge">
                <span class="stat-icon"></span>
                <span class="stat-value">{{ Math.floor(Math.random() * 10) }}</span>
                <span class="stat-label">Stars</span>
              </div>
              <div class="stat-badge">
                <span class="stat-icon"></span>
                <span class="stat-value">{{ Math.floor(Math.random() * 5) }}</span>
                <span class="stat-label">Forks</span>
              </div>
              <div class="stat-badge">
                <span class="stat-icon"></span>
                <span class="stat-label">Open Source</span>
                <span class="stat-tag">Category</span>
              </div>
            </div>

            <div class="card-divider"></div>

            <button class="open-btn" @click="openProject(project.id)">
              <span class="btn-icon"></span>
              Open Project
            </button>
          </div>
        </div>
      </div>

      <button class="add-project-btn" @click="showCreateDialog = true">
        <span class="btn-text">+ New Project</span>
      </button>
    </main>

    <!-- Create Dialog -->
    <el-dialog v-model="showCreateDialog" title="Create New Project" width="500px">
      <div class="create-form">
        <el-input v-model="newProject.name" placeholder="Project Name" style="margin-bottom: 15px;" />
        <el-input v-model="newProject.jobTitle" placeholder="Project Description" style="margin-bottom: 15px;" />
        <el-select v-model="newProject.skills" multiple placeholder="Select Skills" style="width: 100%;">
          <el-option v-for="s in commonSkills" :key="s" :label="s" :value="s" />
        </el-select>
      </div>
      <template #footer>
        <el-button @click="showCreateDialog = false">Cancel</el-button>
        <el-button type="primary" @click="handleCreate">Create</el-button>
      </template>
    </el-dialog>

    <DevPanel />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import DevPanel from '../components/DevPanel.vue'
import { useProjectStore } from '../composables/useProjectStore'

const { t } = useI18n()
const projectStore = useProjectStore()
const showCreateDialog = ref(false)

const newProject = reactive({
  name: '',
  jobTitle: '',
  skills: [] as string[],
  expYears: 3,
  eduLevel: 'Bachelor'
})

const commonSkills = [
  'Vue.js', 'React', 'TypeScript', 'JavaScript', 'Node.js',
  'Python', 'Go', 'Java', 'Docker', 'Kubernetes'
]

function getProjectIcon(name: string): string {
  return ''
}

function openProject(id: string) {
  console.log('Opening project:', id)
  ElMessage.success('Project opened!')
}

async function handleCreate() {
  if (!newProject.name.trim()) return
  const jobCfg = {
    title: newProject.jobTitle,
    requirements: [],
    required_skills: newProject.skills,
    experience_years: newProject.expYears,
    education_level: newProject.eduLevel
  }
  const result = await projectStore.createProject(newProject.name.trim(), jobCfg)
  if (result) {
    showCreateDialog.value = false
    ElMessage.success('Project created!')
    newProject.name = ''
    newProject.jobTitle = ''
    newProject.skills = []
  }
}

onMounted(() => {
  projectStore.loadProjects()
})
</script>

<style scoped lang="scss">
.portfolio-page {
  min-height: 100vh;
  background: #f5f0e8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  background: white;
  border: 3px solid #000;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 8px 8px 0 #000;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;

  .logo-icon {
    width: 45px;
    height: 45px;
    background: #4A90E2;
    border: 3px solid #000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .logo-text {
    font-size: 20px;
    font-weight: 700;
    color: #000;
  }
}

.nav {
  display: flex;
  gap: 40px;

  .nav-link {
    color: #000;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.5px;

    &.active {
      color: #4A90E2;
    }

    &:hover {
      color: #4A90E2;
    }
  }
}

.header-actions {
  display: flex;
  gap: 10px;

  .icon-btn {
    width: 40px;
    height: 40px;
    border: 3px solid #000;
    border-radius: 10px;
    background: white;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }
  }
}

.main-content {
  padding: 40px 60px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.project-card-wrapper {
  perspective: 1000px;
}

.project-card {
  background: #FFE88C;
  border: 4px solid #000;
  border-radius: 25px;
  padding: 35px;
  box-shadow: 12px 12px 0 #000;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 16px 16px 0 #000;
  }
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;

  .project-icon {
    width: 70px;
    height: 70px;
    background: white;
    border: 4px solid #000;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    flex-shrink: 0;
  }

  .card-header-content {
    flex: 1;
  }
}

.project-title {
  font-size: 28px;
  font-weight: 800;
  color: #000;
  margin: 0 0 8px 0;
}

.project-version {
  font-size: 14px;
  color: #4A90E2;
  font-weight: 600;
  margin: 0;
}

.project-description {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 25px;
}

.project-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: white;
  border: 3px solid #000;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;

  .stat-icon {
    font-size: 18px;
  }

  .stat-value {
    color: #000;
    font-weight: 700;
  }

  .stat-label {
    color: #666;
  }

  .stat-tag {
    background: #FFD700;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 12px;
    color: #000;
  }
}

.card-divider {
  height: 3px;
  background: #000;
  margin: 25px 0;
}

.open-btn {
  width: 100%;
  padding: 15px;
  background: #4A90E2;
  border: 4px solid #000;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;

  .btn-icon {
    font-size: 18px;
  }

  &:hover {
    background: #3a7bc8;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
}

.add-project-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 18px 32px;
  background: #FF6B6B;
  border: 4px solid #000;
  border-radius: 15px;
  box-shadow: 6px 6px 0 #000;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 #000;
  }
}

.create-form {
  padding: 20px 0;
}
</style>