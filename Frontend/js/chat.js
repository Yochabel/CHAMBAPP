const socket = io('http://localhost:4000');

const roomId = localStorage.getItem('roomId') || '1'; // ID de la chamba
const sender_id = localStorage.getItem('userId') || crypto.randomUUID();
const receiver_id = localStorage.getItem('receiverId') || null;

const messagesDiv = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');

// Unirse a la sala
socket.emit('joinRoom', roomId);

// Escuchar mensajes
socket.on('chatMessage', (msg) => {
  const msgEl = document.createElement('div');
  msgEl.classList.add('msg');
  msgEl.classList.add(msg.sender_id === sender_id ? 'yo' : 'otro');
  msgEl.textContent = msg.message;
  messagesDiv.appendChild(msgEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Enviar mensaje
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;
  socket.emit('chatMessage', { roomId, sender_id, receiver_id, message: text });
  msgInput.value = '';
}
