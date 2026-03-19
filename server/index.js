const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create messages directory if it doesn't exist
const messagesDir = path.join(__dirname, 'messages');
if (!fs.existsSync(messagesDir)) {
  fs.mkdirSync(messagesDir);
}

// Save message endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create message object
    const contactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || 'No Subject',
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
      timestamp: new Date().toISOString(),
      read: false
    };

    // Save to JSON file
    const messagesFile = path.join(messagesDir, 'messages.json');
    let messages = [];

    if (fs.existsSync(messagesFile)) {
      const data = fs.readFileSync(messagesFile, 'utf8');
      messages = JSON.parse(data);
    }

    messages.unshift(contactMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    console.log('✅ New message received from:', name);
    console.log('📧 Email:', email);
    console.log('📝 Subject:', subject || 'No Subject');
    console.log('💬 Message saved to:', messagesFile);
    console.log('---');

    res.status(200).json({
      success: true,
      message: 'Message received successfully!'
    });

  } catch (error) {
    console.error('❌ Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get all messages (for your private admin access)
app.get('/api/messages', (req, res) => {
  try {
    const messagesFile = path.join(messagesDir, 'messages.json');

    if (!fs.existsSync(messagesFile)) {
      return res.json([]);
    }

    const data = fs.readFileSync(messagesFile, 'utf8');
    const messages = JSON.parse(data);

    res.json(messages);
  } catch (error) {
    console.error('❌ Error reading messages:', error);
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

// Mark message as read
app.patch('/api/messages/:id/read', (req, res) => {
  try {
    const messagesFile = path.join(messagesDir, 'messages.json');

    if (!fs.existsSync(messagesFile)) {
      return res.status(404).json({ error: 'No messages found' });
    }

    const data = fs.readFileSync(messagesFile, 'utf8');
    const messages = JSON.parse(data);

    const message = messages.find(m => m.id === req.params.id);
    if (message) {
      message.read = true;
      fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    console.error('❌ Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Delete message
app.delete('/api/messages/:id', (req, res) => {
  try {
    const messagesFile = path.join(messagesDir, 'messages.json');

    if (!fs.existsSync(messagesFile)) {
      return res.status(404).json({ error: 'No messages found' });
    }

    const data = fs.readFileSync(messagesFile, 'utf8');
    let messages = JSON.parse(data);

    messages = messages.filter(m => m.id !== req.params.id);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

app.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(60));
  console.log('✅ Backend Server is Running!');
  console.log('='.repeat(60));
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`📬 Messages saved to: ${messagesDir}/messages.json`);
  console.log('');
  console.log('📝 Available endpoints:');
  console.log(`   POST   http://localhost:${PORT}/api/contact`);
  console.log(`   GET    http://localhost:${PORT}/api/messages`);
  console.log('');
  console.log('🎯 To view messages: Open server/view-messages.html in browser');
  console.log('='.repeat(60));
  console.log('');
});