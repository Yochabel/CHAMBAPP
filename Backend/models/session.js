const pool = require('../config/dbConfig');

const getSessions = async () => {
    const result = await pool.query('SELECT * FROM Sessions');
    return result.rows;
};

const getSessionById = async (id) => {
    const result = await pool.query('SELECT * FROM Sessions WHERE ID = $1', [id]);
    return result.rows[0];
};

const createSession = async (userId, role) => {
    const result = await pool.query(
        `INSERT INTO Sessions (User_ID, Role, UsedCount, DateExpires) 
        VALUES ($1, $2, 1, NOW() + INTERVAL '1 hour') RETURNING *`,
        [userId, role]
    );
    return result.rows[0];
};

const updateSessionUsage = async (id) => {
    const result = await pool.query(
        `UPDATE Sessions SET UsedCount = UsedCount + 1 WHERE ID = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};

const deleteSession = async (id) => {
    await pool.query('DELETE FROM Sessions WHERE ID = $1', [id]);
    return { message: 'Sesión eliminada' };
};

module.exports = { getSessions, getSessionById, createSession, updateSessionUsage, deleteSession };
