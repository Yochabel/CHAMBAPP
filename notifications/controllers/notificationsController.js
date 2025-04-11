const { saveNotification, getAllNotifications } = require('../models/notifications');

// POST: Simula el envío de una notificación
const enviarNotificacion = async (req, res) => {
  try {
    const { user_email, message, type } = req.body;

    if (!user_email || !message || !type) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const noti = await saveNotification(user_email, message, type);
    console.log(`[NOTIFICACIÓN] Enviada a ${user_email}: ${message} (tipo: ${type})`);

    res.status(201).json(noti);
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar notificación', error: err.message });
  }
};

// GET: Obtener historial de notificaciones
const obtenerNotificaciones = async (_req, res) => {
  try {
    const notis = await getAllNotifications();
    res.status(200).json(notis);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener notificaciones', error: err.message });
  }
};

module.exports = {
  enviarNotificacion,
  obtenerNotificaciones
};
