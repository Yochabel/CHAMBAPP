const pool = require('./db');

const getChambas = async () => {
    const result = await pool.query('SELECT * FROM Chamba');
    return result.rows;
};

const getChambaById = async (id) => {
    const result = await pool.query('SELECT * FROM Chamba WHERE ID = $1', [id]);
    return result.rows[0];
};

const createChamba = async (data) => {
    const { Client_ID, Chambeador_ID, Servicio, Descripcion, CostAgreed } = data;
    const result = await pool.query(
        `INSERT INTO Chamba 
        (Client_ID, Chambeador_ID, Servicio, Descripcion, CostAgreed, DateCreated) 
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *`,
        [Client_ID, Chambeador_ID, Servicio, Descripcion, CostAgreed]
    );
    return result.rows[0];
};


const updateChamba = async (id, data) => {
    const { StepStatus } = data;
    const result = await pool.query(
        'UPDATE Chamba SET StepStatus = $1 WHERE ID = $2 RETURNING *',
        [StepStatus, id]
    );
    return result.rows[0];
};

const deleteChamba = async (id) => {
    await pool.query('DELETE FROM Chamba WHERE ID = $1', [id]);
    return { message: 'Chamba eliminada' };
};

module.exports = { getChambas, getChambaById, createChamba, updateChamba, deleteChamba };
