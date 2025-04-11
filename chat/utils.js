const pool = require('./db');

async function deleteOldMessages(roomId) {
  try {
    await pool.query(
      `DELETE FROM ChatMessages WHERE room_id = $1 AND created_at < NOW() - INTERVAL '6 months'`,
      [roomId]
    );
    console.log(`🧹 Mensajes antiguos eliminados para sala: ${roomId}`);
  } catch (err) {
    console.error('⚠️ Error al borrar historial:', err);
  }
}

module.exports = { deleteOldMessages };
