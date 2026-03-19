import { ref } from 'vue'

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  time: string
  read: boolean
}

const messages = ref<ContactMessage[]>([])

export function useMessagesStore() {
  function loadMessages() {
    const saved = localStorage.getItem('contact_messages')
    if (saved) {
      messages.value = JSON.parse(saved)
    }
  }

  function saveMessage(name: string, email: string, subject: string, message: string) {
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    }

    messages.value.unshift(newMessage)
    localStorage.setItem('contact_messages', JSON.stringify(messages.value))
  }

  function markAsRead(id: string) {
    const msg = messages.value.find(m => m.id === id)
    if (msg) {
      msg.read = true
      localStorage.setItem('contact_messages', JSON.stringify(messages.value))
    }
  }

  function deleteMessage(id: string) {
    messages.value = messages.value.filter(m => m.id !== id)
    localStorage.setItem('contact_messages', JSON.stringify(messages.value))
  }

  function getUnreadCount() {
    return messages.value.filter(m => !m.read).length
  }

  return {
    messages,
    loadMessages,
    saveMessage,
    markAsRead,
    deleteMessage,
    getUnreadCount
  }
}