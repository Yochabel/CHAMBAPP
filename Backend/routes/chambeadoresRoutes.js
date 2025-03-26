const express = require('express');
const router = express.Router();
const chambeadoresController = require('../controllers/chambeadoresController');

router.get('/', chambeadoresController.getAll);
router.get('/:id', chambeadoresController.getById);
router.post('/', chambeadoresController.create);
router.put('/:id', chambeadoresController.update);
router.delete('/:id', chambeadoresController.delete);

module.exports = router;
