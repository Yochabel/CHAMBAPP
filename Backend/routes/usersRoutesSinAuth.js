const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
