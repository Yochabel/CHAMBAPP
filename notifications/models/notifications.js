const pool = require('../config/dbConfig');

const saveNotification = async (email, message, type) => {
  const result = await pool.query(`
    INSERT INTO Notifications (user_email, message, type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [email, message, type]);

  return result.rows[0];
};

const getAllNotifications = async () => {
  const result = await pool.query(`SELECT * FROM Notifications ORDER BY created_at DESC`);
  return result.rows;
};

module.exports = {
  saveNotification,
  getAllNotifications
};
