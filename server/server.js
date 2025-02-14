const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Permite conexões de qualquer origem
    methods: ["GET", "POST"]
  }
});

// Servindo arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lógica do Socket.io
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Enviar mensagem de boas-vindas
  socket.emit('receive_message', { username: 'Servidor', message: 'Bem-vindo ao chat!', emoji: '' });

  // Reenviar mensagens para todos os clientes conectados
  socket.on('send_message', (msgData) => {
    io.emit('receive_message', msgData);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
