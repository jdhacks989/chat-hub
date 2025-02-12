const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Lógica do Socket.io
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
  
  // Enviar uma mensagem de boas-vindas ao novo usuário
  socket.emit('receive_message', { username: 'Servidor', message: 'Bem-vindo ao chat!', emoji: '' });

  // Quando um cliente envia uma mensagem, o servidor retransmite para todos os clientes
  socket.on('send_message', (msgData) => {
    io.emit('receive_message', msgData);  // Envia para todos os clientes conectados
  });

  // Notificar quando o usuário se desconectar
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
