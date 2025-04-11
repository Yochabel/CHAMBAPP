const express = require('express');
const router = express.Router();
const { crearChamba } = require('../controllers/chambaController');

router.post('/create', crearChamba);

module.exports = router;
