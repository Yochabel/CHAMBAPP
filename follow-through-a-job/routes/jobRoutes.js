const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/:userId', jobController.getJobsByUser);
router.patch('/:jobId/status', jobController.updateJobStatus);
router.post('/:jobId/comment', jobController.addJobComment);

module.exports = router;
