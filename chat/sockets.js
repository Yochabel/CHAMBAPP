const { pubClient, subClient } = require('./redis');
const pool = require('./db');

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`🧑‍🤝‍🧑 ${socket.id} se unió a la sala ${roomId}`);
    });

    socket.on('chatMessage', async ({ roomId, sender_id, receiver_id, message }) => {
      const msg = JSON.stringify({ sender_id, message });

      // Redis publica mensaje a la sala
      await pubClient.publish(roomId, msg);

      // Guardar en PostgreSQL
      await pool.query(
        'INSERT INTO ChatMessages (room_id, sender_id, receiver_id, message) VALUES ($1, $2, $3, $4)',
        [roomId, sender_id, receiver_id, message]
      );

      // 🔥 Borrar mensajes viejos (más de 6 meses) de esta sala
      await pool.query(
        `DELETE FROM ChatMessages WHERE room_id = $1 AND created_at < NOW() - INTERVAL '6 months'`,
        [roomId]
      );
    });

    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado:', socket.id);
    });
  });

  subClient.pSubscribe('*', (message, channel) => {
    const parsed = JSON.parse(message);
    io.to(channel).emit('chatMessage', parsed);
  });
}

module.exports = socketHandler;
