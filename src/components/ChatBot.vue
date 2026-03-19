<template>
  <div class="chat-bot" :class="{ open: isOpen }">
    <div class="chat-header" @click="toggleChat">
      <div class="header-info">
        <div class="bot-avatar"></div>
        <div class="bot-status">
          <h3>T Lohith's AI Assistant</h3>
          <span class="status-online">Online</span>
        </div>
      </div>
      <button class="close-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <div class="chat-messages" ref="messageContainer">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.type]"
      >
        <div class="message-bubble">
          {{ msg.text }}
        </div>
      </div>
      <div v-if="isTyping" class="message bot typing">
        <div class="message-bubble">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Ask me about T Lohith..."
        type="text"
      />
      <button @click="sendMessage" :disabled="!userInput.trim()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue'

const isOpen = ref(false)
const userInput = ref('')
const isTyping = ref(false)
const messageContainer = ref<HTMLElement | null>(null)

const messages = reactive([
  {
    type: 'bot',
    text: "Hi! I'm T Lohith's AI assistant. I can answer questions about his skills, projects, education, and experience. How can I help you today?"
  }
])

const responses: Record<string, string> = {
  skills: "T Lohith is skilled in SOC/SIEM (Splunk, Microsoft Sentinel), OT/ICS security (Modbus TCP, SCADA architecture), malware analysis (FlareVM, REMnux), and network security (Scapy, Nmap). He's also proficient in Python and tools like Docker, Metasploit, and Wireshark.",
  projects: "T Lohith has worked on critical projects like:\n\n1. OT/ICS Modbus TCP Honeypot (Live Deployed, MITRE ATT&CK for ICS)\n2. OT/ICS SIEM Dashboard (Production SIEM with ML anomaly detection)\n3. Malware Analysis Lab (Static & Dynamic analysis of real samples)\n4. Network Traffic Analyzer (OT protocol fingerprinting)",
  education: "T Lohith is pursuing an M.Tech in Networks & Cybersecurity from Amity University Gurugram (2024-2026). He also holds a B.Tech in Cybersecurity, IoT & Blockchain from Siddharth Institute of Engineering & Technology (2019-2024).",
  contact: "You can reach T Lohith at:\n Email: itslohith116@gmail.com\n LinkedIn: linkedin.com/in/its-lohith-944909318\n GitHub: github.com/Lohith115\n Portfolio: tlohith.me",
  experience: "T Lohith's experience includes:\n- Ethical Hacking Intern at InLighnX Global Pvt. Ltd. (Jul-Aug 2025)\n- Full Stack Python Developer Intern at Aavanto Pvt. Ltd. (Oct-Dec 2023)",
  about: "T Lohith is a Cybersecurity Engineer specializing in OT/ICS security and Blue Team operations. He is passionate about protecting critical infrastructure and has developed live threat detection systems using MITRE ATT&CK frameworks.",
  certificates: "T Lohith holds certifications including:\n- Google Cybersecurity Professional Certificate\n- CompTIA Security+ (In Progress)\n- TryHackMe PRO (SOC L1, Blue Team)\n- HackerArise: SCADA Security, Web App Hacking, OSINT",
  github: "You can find T Lohith's projects on GitHub at github.com/Lohith115. His repositories include work on honeypots, SIEM dashboards, and network analysis tools!",
  blog: "T Lohith shares technical insights on cybersecurity and OT/ICS security. You can find his portfolio and related technical info at tlohith.me."
}

function toggleChat() {
  isOpen.value = !isOpen.value
}

async function sendMessage() {
  if (!userInput.value.trim()) return

  const userMsg = userInput.value.trim()
  messages.push({ type: 'user', text: userMsg })
  userInput.value = ''

  await scrollToBottom()

  isTyping.value = true
  setTimeout(async () => {
    isTyping.value = false
    const botResponse = getBotResponse(userMsg)
    messages.push({ type: 'bot', text: botResponse })
    await scrollToBottom()
  }, 1000)
}

function getBotResponse(input: string): string {
  const lowerInput = input.toLowerCase()
  
  if (lowerInput.includes('skill') || lowerInput.includes('technolog') || lowerInput.includes('know')) {
    return responses.skills
  } else if (lowerInput.includes('project') || lowerInput.includes('work')) {
    return responses.projects
  } else if (lowerInput.includes('educat') || lowerInput.includes('stud') || lowerInput.includes('college')) {
    return responses.education
  } else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email')) {
    return responses.contact
  } else if (lowerInput.includes('experience') || lowerInput.includes('job') || lowerInput.includes('intern')) {
    return responses.experience
  } else if (lowerInput.includes('about') || lowerInput.includes('who')) {
    return responses.about
  } else if (lowerInput.includes('certificat') || lowerInput.includes('certif')) {
    return responses.certificates
  } else if (lowerInput.includes('github')) {
    return responses.github
  } else if (lowerInput.includes('blog')) {
    return responses.blog
  } else {
    return "I'm here to help! You can ask me about T Lohith's skills, projects, education, experience, certifications, or how to contact him. What would you like to know?"
  }
}

async function scrollToBottom() {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}
</script>

<style scoped lang="scss">
.chat-bot {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 380px;
  height: 550px;
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  box-shadow: 12px 12px 0 #000;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: translateY(120%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.open {
    transform: translateY(0);
  }
}

.chat-header {
  padding: 20px;
  background: #4A90E2;
  border-bottom: 4px solid #000;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .header-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .bot-avatar {
    width: 45px;
    height: 45px;
    background: #FFD700;
    border: 3px solid #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .bot-status {
    h3 {
      font-size: 16px;
      font-weight: 800;
      color: white;
      margin: 0;
    }

    .status-online {
      font-size: 12px;
      color: #90EE90;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 5px;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        background: #90EE90;
        border-radius: 50%;
        display: inline-block;
      }
    }
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
}

.message {
  max-width: 80%;
  
  &.user {
    align-self: flex-end;

    .message-bubble {
      background: #FF6B6B;
      color: white;
      border: 3px solid #000;
      border-radius: 15px 15px 0 15px;
    }
  }

  &.bot {
    align-self: flex-start;

    .message-bubble {
      background: white;
      color: #000;
      border: 3px solid #000;
      border-radius: 15px 15px 15px 0;
      white-space: pre-wrap;
    }
  }

  .message-bubble {
    padding: 12px 18px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
  }
}

.typing {
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #000;
    border-radius: 50%;
    margin-right: 3px;
    animation: typing 1s infinite;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes typing {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.chat-input {
  padding: 20px;
  background: white;
  border-top: 4px solid #000;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 12px 15px;
    border: 3px solid #000;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    outline: none;

    &:focus {
      border-color: #4A90E2;
    }
  }

  button {
    width: 45px;
    height: 45px;
    background: #4A90E2;
    border: 3px solid #000;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0 #000;
    }

    &:active:not(:disabled) {
      transform: translate(0, 0);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
}

@media (max-width: 480px) {
  .chat-bot {
    width: calc(100vw - 40px);
    right: 20px;
    bottom: 80px;
  }
}
</style>
