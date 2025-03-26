const jobModel = require('../models/jobModel');

exports.getJobsByUser = async (req, res) => {
  const { userId } = req.params;
  const jobs = await jobModel.getJobsByUser(userId);
  res.json(jobs);
};

exports.updateJobStatus = async (req, res) => {
  const { jobId } = req.params;
  const { status } = req.body;
  await jobModel.updateJobStatus(jobId, status);
  res.json({ message: 'Status updated' });
};

exports.addJobComment = async (req, res) => {
  const { jobId } = req.params;
  const { comment } = req.body;
  await jobModel.addJobComment(jobId, comment);
  res.json({ message: 'Comment added' });
};
