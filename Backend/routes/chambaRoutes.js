const express = require('express');
const router = express.Router();
const chambaController = require('../controllers/chambaController');

router.get('/', chambaController.getAll);
router.get('/:id', chambaController.getById);
router.post('/', chambaController.create);
router.put('/:id', chambaController.update);
router.delete('/:id', chambaController.delete);

module.exports = router;
