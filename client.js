const socket = io();

socket.on('message', (message) => {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `<p><strong>${message.username}:</strong> ${message.text}</p>`;
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    const username = 'User'; // You can change this to allow users to enter their usernames.
    socket.emit('chatMessage', { username, text: message });
    messageInput.value = '';
}
