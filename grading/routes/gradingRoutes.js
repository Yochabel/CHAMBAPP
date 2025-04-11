const express = require('express');
const router = express.Router();
const { calificar } = require('../controllers/gradingController');

router.put('/review/:chambaId', calificar);

module.exports = router;
