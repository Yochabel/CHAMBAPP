const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');
const auth = require('../middlewares/auth'); // Para proteger las rutas

router.get('/', auth, sessionsController.getAll);
router.get('/:id', auth, sessionsController.getById);
router.post('/', auth, sessionsController.create);
router.put('/:id', auth, sessionsController.update);
router.delete('/:id', auth, sessionsController.delete);

module.exports = router;
