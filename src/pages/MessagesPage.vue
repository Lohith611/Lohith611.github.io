<template>
  <div class="messages-page">
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">
          Messages Inbox
          <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
        </h1>
      </div>

      <div v-if="messagesStore.messages.length === 0" class="empty-state">
        <div class="empty-icon"></div>
        <h3>No Messages Yet</h3>
        <p>When someone contacts you through the form, their messages will appear here.</p>
      </div>

      <div v-else class="messages-list">
        <div
          v-for="message in messagesStore.messages"
          :key="message.id"
          :class="['message-card', { unread: !message.read }]"
          @click="openMessage(message)"
        >
          <div class="message-header">
            <div class="sender-info">
              <div class="sender-avatar">{{ message.name.charAt(0).toUpperCase() }}</div>
              <div class="sender-details">
                <h3 class="sender-name">{{ message.name }}</h3>
                <p class="sender-email">{{ message.email }}</p>
              </div>
            </div>
            <div class="message-meta">
              <span class="message-date">{{ message.date }}</span>
              <span class="message-time">{{ message.time }}</span>
              <button class="delete-btn" @click.stop="deleteMsg(message.id)" title="Delete">
              </button>
            </div>
          </div>

          <div class="message-subject">{{ message.subject }}</div>
          <div class="message-preview">{{ message.message }}</div>

          <div v-if="!message.read" class="unread-indicator">New</div>
        </div>
      </div>
    </div>

    <!-- Message Detail Modal -->
    <el-dialog
      v-model="showModal"
      :title="selectedMessage?.subject"
      width="700px"
      class="message-modal"
    >
      <div v-if="selectedMessage" class="modal-content">
        <div class="modal-header-info">
          <div class="sender-avatar-large">{{ selectedMessage.name.charAt(0).toUpperCase() }}</div>
          <div>
            <h3>{{ selectedMessage.name }}</h3>
            <p>{{ selectedMessage.email }}</p>
            <span class="timestamp">{{ selectedMessage.date }} at {{ selectedMessage.time }}</span>
          </div>
        </div>

        <div class="message-divider"></div>

        <div class="message-body">
          <h4>Subject:</h4>
          <p class="subject-text">{{ selectedMessage.subject }}</p>

          <h4>Message:</h4>
          <p class="message-text">{{ selectedMessage.message }}</p>
        </div>

        <div class="modal-actions">
          <a :href="`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`" class="reply-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12l18-9v18z"/>
            </svg>
            Reply via Email
          </a>
        </div>
      </div>
    </el-dialog>

    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useMessagesStore } from '../composables/useMessagesStore'
import ScrollToTop from '../components/ScrollToTop.vue'
import type { ContactMessage } from '../composables/useMessagesStore'

const messagesStore = useMessagesStore()
const showModal = ref(false)
const selectedMessage = ref<ContactMessage | null>(null)

const unreadCount = computed(() => messagesStore.getUnreadCount())

function openMessage(message: ContactMessage) {
  selectedMessage.value = message
  showModal.value = true
  messagesStore.markAsRead(message.id)
}

async function deleteMsg(id: string) {
  try {
    await ElMessageBox.confirm('Are you sure you want to delete this message?', 'Delete Message', {
      type: 'warning',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    })
    messagesStore.deleteMessage(id)
    ElMessage.success('Message deleted!')
  } catch {}
}

onMounted(() => {
  messagesStore.loadMessages()
})
</script>

<style scoped lang="scss">
.messages-page {
  position: relative;
  z-index: 1;
  padding: 60px;
  min-height: calc(100vh - 200px);
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-primary);
  margin: 0;
  text-shadow: 4px 4px 0 #FFD700;
  display: flex;
  align-items: center;
  gap: 15px;
}

.unread-badge {
  width: 45px;
  height: 45px;
  background: #FF6B6B;
  border: 4px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  box-shadow: 4px 4px 0 #000;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  box-shadow: 8px 8px 0 #000;

  .empty-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 28px;
    font-weight: 800;
    color: #000;
    margin: 0 0 15px 0;
  }

  p {
    font-size: 16px;
    color: #666;
  }
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-card {
  position: relative;
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 6px 6px 0 #000;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 #000;
  }

  &.unread {
    background: #FFF9E6;
    border-color: #FFD700;
  }
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.sender-info {
  display: flex;
  gap: 15px;
  align-items: center;
}

.sender-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  border: 3px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: white;
}

.sender-details {
  h3 {
    font-size: 18px;
    font-weight: 800;
    color: #000;
    margin: 0 0 5px 0;
  }

  p {
    font-size: 14px;
    color: #4A90E2;
    margin: 0;
  }
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 10px;

  .message-date,
  .message-time {
    font-size: 13px;
    color: #666;
    font-weight: 600;
  }
}

.delete-btn {
  width: 35px;
  height: 35px;
  background: white;
  border: 3px solid #000;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #FF6B6B;
    transform: scale(1.1);
  }
}

.message-subject {
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
}

.message-preview {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.unread-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 12px;
  background: #FF6B6B;
  border: 2px solid #000;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
}

// Modal Styles
.modal-content {
  padding: 20px 10px;
}

.modal-header-info {
  display: flex;
  gap: 20px;
  align-items: center;

  .sender-avatar-large {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #4A90E2, #357ABD);
    border: 4px solid #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 800;
    color: white;
  }

  h3 {
    font-size: 22px;
    font-weight: 800;
    color: #000;
    margin: 0 0 5px 0;
  }

  p {
    font-size: 15px;
    color: #4A90E2;
    margin: 0 0 5px 0;
  }

  .timestamp {
    font-size: 13px;
    color: #666;
  }
}

.message-divider {
  height: 3px;
  background: #000;
  margin: 25px 0;
}

.message-body {
  h4 {
    font-size: 16px;
    font-weight: 800;
    color: #000;
    margin: 0 0 10px 0;
  }

  .subject-text {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 25px 0;
  }

  .message-text {
    font-size: 15px;
    line-height: 1.8;
    color: #333;
    white-space: pre-line;
    background: #f5f5f5;
    padding: 20px;
    border: 3px solid #000;
    border-radius: 12px;
    margin: 0 0 25px 0;
  }
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.reply-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: #4A90E2;
  border: 4px solid #000;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #357ABD;
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 #000;
  }
}
</style>

<style lang="scss">
.message-modal {
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
      font-size: 20px;
      font-weight: 800;
      color: #000;
    }
  }

  .el-dialog__body {
    padding: 30px;
  }
}
</style>