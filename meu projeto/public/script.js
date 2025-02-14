const socket = io();  // Conectar ao servidor

// Quando clicar no botão, enviar mensagem
document.querySelector('button').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('messageInput').value.trim();
    
    if (message) {
        socket.emit('send_message', { username, message });
        document.getElementById('messageInput').value = ''; // Limpa campo
    }
});

// Receber mensagens do servidor
socket.on('receive_message', (msgData) => {
    const chat = document.getElementById('chat');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.innerHTML = `<strong>${msgData.username}:</strong> ${msgData.message}`;
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;  // Rolar para baixo
});
