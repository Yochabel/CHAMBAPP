const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth'); // Importamos el middleware de autenticación

// Rutas protegidas con JWT
router.get('/', auth, usersController.getAll);
router.get('/:id', auth, usersController.getById);
router.put('/:id', auth, usersController.update);
router.delete('/:id', auth, usersController.delete);

// Rutas públicas
router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;
