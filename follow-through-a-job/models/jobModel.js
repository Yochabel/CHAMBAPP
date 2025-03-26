const db = require('./db');

exports.getJobsByUser = async (userId) => {
  const result = await db.query('SELECT * FROM chamba WHERE user_id = $1', [userId]);
  return result.rows;
};

exports.updateJobStatus = async (jobId, status) => {
  await db.query('UPDATE chamba SET status = $1 WHERE id = $2', [status, jobId]);
};

exports.addJobComment = async (jobId, comment) => {
  await db.query('UPDATE chamba SET comment = $1 WHERE id = $2', [comment, jobId]);
};
