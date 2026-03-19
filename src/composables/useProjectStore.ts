import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getMockProjects, createMockProject, deleteMockProject, type Project } from '../mock/mockProjects'

export { type Project } from '../mock/mockProjects'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const currentProjectId = ref<string>('')
  const loading = ref(false)

  const currentProject = computed(() => {
    return projects.value.find(p => p.id === currentProjectId.value) || null
  })

  async function loadProjects() {
    loading.value = true
    try {
      const list = await getMockProjects()
      projects.value = list
      console.log('✅ Loaded projects:', list.length)
    } catch (error) {
      console.error('❌ Failed to load projects:', error)
    } finally {
      loading.value = false
    }
  }

  async function createProject(name: string, jobConfig: any): Promise<boolean> {
    try {
      const newProject = await createMockProject(name, jobConfig)
      projects.value.unshift(newProject)
      console.log('✅ Created project:', newProject.name)
      return true
    } catch (error) {
      console.error('❌ Failed to create project:', error)
      return false
    }
  }

  async function deleteProject(id: string): Promise<boolean> {
    try {
      await deleteMockProject(id)
      const index = projects.value.findIndex(p => p.id === id)
      if (index > -1) {
        projects.value.splice(index, 1)
      }
      console.log('✅ Deleted project:', id)
      return true
    } catch (error) {
      console.error('❌ Failed to delete project:', error)
      return false
    }
  }

  return {
    projects,
    currentProjectId,
    currentProject,
    loading,
    loadProjects,
    createProject,
    deleteProject
  }
})