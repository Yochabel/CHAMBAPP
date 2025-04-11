const express = require('express');
const router = express.Router();
const { enviarNotificacion, obtenerNotificaciones } = require('../controllers/notificationsController');

router.post('/send', enviarNotificacion);
router.get('/', obtenerNotificaciones);

module.exports = router;
