<template>
  <div class="contact-page">
    <div class="page-container">
      <h1 class="page-title">Get In Touch</h1>

      <div class="contact-layout">
        <div class="contact-info">
          <h2>Let's Connect!</h2>
          <p>Feel free to reach out for collaborations, opportunities, or just a friendly chat about AI and technology.</p>

          <div class="contact-methods">
            <div class="contact-item">
              <div>
                <h4>Email</h4>
                <a href="mailto:itslohith116@gmail.com">itslohith116@gmail.com</a>
              </div>
            </div>

            <div class="contact-item">
              <div>
                <h4>LinkedIn</h4>
                <a href="https://linkedin.com/in/its-lohith-944909318" target="_blank">linkedin.com/in/its-lohith-944909318</a>
              </div>
            </div>

            <div class="contact-item">
              <div>
                <h4>GitHub</h4>
                <a href="https://github.com/Lohith115" target="_blank">github.com/Lohith115</a>
              </div>
            </div>

            <div class="contact-item">
              <div>
                <h4>Medium</h4>
                <a href="https://medium.com/@itslohith116" target="_blank">medium.com/@itslohith116</a>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <h3>Send a Message</h3>
          <form @submit.prevent="sendMessage" class="contact-form">
            <el-input v-model="form.name" placeholder="Your Name" />
            <el-input v-model="form.email" placeholder="Your Email" type="email" />
            <el-input v-model="form.subject" placeholder="Subject" />
            <el-input v-model="form.message" placeholder="Your Message" type="textarea" :rows="6" />
            <button type="submit" class="submit-btn" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import ScrollToTop from '../components/ScrollToTop.vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)

async function sendMessage() {
  if (!form.name || !form.email || !form.message) {
    ElMessage.warning('Please fill in all required fields')
    return
  }

  loading.value = true

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (response.ok) {
      ElMessage.success('Message sent successfully! I\'ll get back to you soon.')

      // Clear form
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
    } else {
      ElMessage.error('Failed to send message. Please try again.')
    }
  } catch (error) {
    console.error('Error sending message:', error)
    ElMessage.error('Failed to send message. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.contact-page {
  position: relative;
  z-index: 1;
  padding: 60px;
  min-height: calc(100vh - 200px);
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-primary);
  margin: 0 0 60px 0;
  text-align: center;
  text-shadow: 4px 4px 0 #FFD700;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.contact-info {
  h2 {
    font-size: 32px;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 20px 0;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 40px;
  }
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.contact-item {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: white;
  border: 3px solid #000;
  border-radius: 15px;
  box-shadow: 5px 5px 0 #000;
  transition: all 0.2s;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #000;
  }

  .contact-icon {
    width: 60px;
    height: 60px;
    background: #FFE88C;
    border: 3px solid #000;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: #000;
    margin: 0 0 5px 0;
  }

  a {
    font-size: 15px;
    color: #4A90E2;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}

.contact-form-wrapper {
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 8px 8px 0 #000;

  h3 {
    font-size: 28px;
    font-weight: 800;
    color: #000;
    margin: 0 0 30px 0;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.submit-btn {
  padding: 16px;
  background: #4A90E2;
  border: 4px solid #000;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 #000;
    background: #357ABD;
  }

  &:active:not(:disabled) {
    transform: translate(0, 0);
    box-shadow: 3px 3px 0 #000;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@media (max-width: 968px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}
</style>