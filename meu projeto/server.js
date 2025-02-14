const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir arquivos estáticos (index.html, script.js, style.css)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para carregar o chat
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lógica do Socket.io
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    // Enviar mensagem de boas-vindas ao usuário
    socket.emit('receive_message', { username: 'Servidor', message: 'Bem-vindo ao Chat Hub! 🚀' });

    // Quando o cliente enviar uma mensagem, retransmitimos para todos
    socket.on('send_message', (msgData) => {
        io.emit('receive_message', msgData);
    });

    // Notificar quando o usuário se desconectar
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Configuração da porta
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
