const pool = require('../config/dbConfig');

// Actualizar evaluación de una chamba
const updateReview = async (chambaId, data, reviewerRole) => {
  if (reviewerRole === 'cliente') {
    const result = await pool.query(`
      UPDATE Chamba
      SET ScoreForChambeador = $1,
          ReviewTextFromClient = $2
      WHERE Chamba_ID = $3
      RETURNING *;
    `, [data.score, data.review, chambaId]);
    return result.rows[0];
  }

  if (reviewerRole === 'chambeador') {
    const result = await pool.query(`
      UPDATE Chamba
      SET ScoreForClient = $1,
          ReviewTextFromChambeador = $2
      WHERE Chamba_ID = $3
      RETURNING *;
    `, [data.score, data.review, chambaId]);
    return result.rows[0];
  }

  throw new Error('Invalid role');
};

module.exports = {
  updateReview
};
