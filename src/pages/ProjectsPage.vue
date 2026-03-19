<template>
  <div class="projects-page">
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">My Projects</h1>
      </div>

      <!-- Category Filter Panel -->
      <div class="filter-panel">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['filter-btn', { active: selectedCategory === cat.id }]"
          @click="selectedCategory = cat.id"
        >
          <span class="filter-icon"></span>
          {{ cat.label }}
        </button>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="loading" />

      <!-- Projects Grid -->
      <div v-else class="projects-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card"
        >
          <div class="card-header">
          </div>

          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-description">{{ project.job_config.title }}</p>

          <div class="project-skills">
            <span
              v-for="skill in project.job_config.required_skills.slice(0, 3)"
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>

          <div class="project-footer">
            <span class="status-badge" :class="project.status">{{ project.status }}</span>
            <button class="view-btn" @click="openProjectModal(project)">View Details</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Details Modal -->
    <el-dialog
      v-model="showModal"
      :title="selectedProject?.name"
      width="700px"
      :close-on-click-modal="true"
      class="project-modal"
    >
      <div v-if="selectedProject" class="modal-content">
        <!-- Project Title -->
        <h2 class="modal-title">{{ selectedProject.name }}</h2>

        <!-- Status Badge -->
        <span class="status-badge-large" :class="selectedProject.status">
          {{ selectedProject.status }}
        </span>

        <!-- Detailed Description -->
        <div class="modal-section">
          <h3>Detailed Description</h3>
          <div
            class="detailed-text"
            v-html="selectedProject.detailed_description || selectedProject.job_config.title || 'No description available'"
          ></div>
        </div>

        <!-- Timeline -->
        <div class="modal-section">
          <h3>Timeline</h3>
          <p class="timeline-text">
            <strong>Started:</strong> {{ selectedProject.start_date }}<br>
            <strong>Completed:</strong> {{ selectedProject.end_date }}
          </p>
        </div>

        <!-- Technologies -->
        <div class="modal-section">
          <h3>Technologies Used</h3>
          <div class="modal-skills">
            <span
              v-for="skill in selectedProject.job_config.required_skills"
              :key="skill"
              class="modal-skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Links - Only GitHub -->
        <div class="modal-section" v-if="selectedProject.github_link">
          <h3>Project Link</h3>
          <div class="modal-links">
            <a
              :href="selectedProject.github_link"
              target="_blank"
              class="modal-link github"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </el-dialog>

    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '../composables/useProjectStore'
import ScrollToTop from '../components/ScrollToTop.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import type { Project } from '../mock/mockProjects'

const projectStore = useProjectStore()
const showModal = ref(false)
const selectedProject = ref<Project | null>(null)
const selectedCategory = ref('ALL')
const loading = ref(true)

const categories = [
  { id: 'ALL', label: 'ALL', icon: '' },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: '' },
  { id: 'OT/ICS', label: 'OT/ICS', icon: '' },
  { id: 'Malware', label: 'Malware', icon: '' },
  { id: 'Network', label: 'Network', icon: '' }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'ALL') {
    return projectStore.projects
  }
  return projectStore.projects.filter(p => p.category === selectedCategory.value)
})

function getProjectIcon(name: string): string {
  return ''
}

function openProjectModal(project: Project) {
  selectedProject.value = project
  showModal.value = true
}

onMounted(async () => {
  loading.value = true
  await projectStore.loadProjects()
  loading.value = false
})
</script>

<style scoped lang="scss">
.projects-page {
  position: relative;
  z-index: 1;
  padding: 60px;
  min-height: calc(100vh - 200px);
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-primary);
  margin: 0;
  text-shadow: 4px 4px 0 #FFD700;
}

.filter-panel {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  box-shadow: 6px 6px 0 #000;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  border: 3px solid #000;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;

  .filter-icon {
    font-size: 18px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 0 #000;
  }

  &.active {
    background: #FFD700;
    box-shadow: 4px 4px 0 #000;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.project-card {
  background: #FFE88C;
  border: 4px solid #000;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 8px 8px 0 #000;
  transition: all 0.3s;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000;
  }
}

.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;

  .project-icon {
    width: 60px;
    height: 60px;
    background: white;
    border: 3px solid #000;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
}

.project-name {
  font-size: 20px;
  font-weight: 800;
  color: #000;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.project-description {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin: 0 0 12px 0;
  flex: 1;
}

.project-skills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.skill-tag {
  padding: 5px 10px;
  background: white;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 3px solid #000;
  margin-top: auto;
}

.status-badge {
  padding: 5px 12px;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;

  &.completed {
    background: #90EE90;
    color: #006400;
  }

  &.analyzing {
    background: #87CEEB;
    color: #00008B;
  }

  &.draft {
    background: white;
    color: #8B4513;
  }
}

.view-btn {
  padding: 8px 16px;
  background: #4A90E2;
  border: 3px solid #000;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: #357ABD;
  }
}

.modal-content {
  padding: 20px 10px;
  max-height: 70vh;
  overflow-y: auto;
}

.modal-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  background: #FFE88C;
  border: 4px solid #000;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}

.modal-title {
  font-size: 28px;
  font-weight: 800;
  color: #000;
  text-align: center;
  margin: 0 0 15px 0;
}

.status-badge-large {
  display: inline-block;
  padding: 8px 16px;
  border: 3px solid #000;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 auto 30px;
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  &.completed {
    background: #90EE90;
    color: #006400;
  }

  &.analyzing {
    background: #87CEEB;
    color: #00008B;
  }

  &.draft {
    background: #FFD700;
    color: #8B4513;
  }
}

.modal-section {
  margin-bottom: 25px;

  h3 {
    font-size: 18px;
    font-weight: 800;
    color: #000;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 15px;
    line-height: 1.7;
    color: #333;
    margin: 0;
  }
}

.detailed-text {
  font-size: 15px;
  color: #333;
  line-height: 1.8;
}

.timeline-text {
  background: #F5F5F5;
  padding: 15px;
  border: 3px solid #000;
  border-radius: 10px;
  font-size: 15px;

  strong {
    color: #4A90E2;
    font-weight: 700;
  }
}

.modal-skills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.modal-skill-tag {
  padding: 8px 14px;
  background: #FFE88C;
  border: 3px solid #000;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
}

.modal-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.modal-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 3px solid #000;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 20px;
    height: 20px;
  }

  &.github {
    background: #000;
    color: white;

    &:hover {
      background: #333;
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 #000;
    }
  }
}

@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<style lang="scss">
.project-modal {
  .el-dialog {
    border: 4px solid #000;
    border-radius: 25px;
    box-shadow: 12px 12px 0 #000;
  }

  .el-dialog__header {
    background: #FFE88C;
    border-bottom: 4px solid #000;
    padding: 20px;

    .el-dialog__title {
      font-size: 24px;
      font-weight: 800;
      color: #000;
    }

    .el-dialog__headerbtn {
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;

      .el-dialog__close {
        font-size: 24px;
        font-weight: 900;
        color: #000;
      }
    }
  }

  .el-dialog__body {
    padding: 30px;
  }
}

.detailed-text {
  ul {
    margin: 0;
    padding-left: 20px;
    list-style-type: disc;

    li {
      margin: 10px 0;
      line-height: 1.8;
      font-size: 15px;
      color: #333;
    }
  }

  span.num,
  span.success,
  span.improve,
  span.issue {
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 700;
    display: inline;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  span.num {
    background: rgba(255, 240, 180, 0.4);
    color: #856404;
  }

  span.success {
    background: rgba(200, 255, 200, 0.4);
    color: #155724;
  }

  span.improve {
    background: rgba(180, 220, 255, 0.4);
    color: #004085;
  }

  span.issue {
    background: rgba(255, 200, 210, 0.4);
    color: #721c24;
  }
}
</style>