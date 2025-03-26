const pool = require('./db');

const getClients = async () => {
    const result = await pool.query('SELECT * FROM Clients');
    return result.rows;
};

const getClientById = async (id) => {
    const result = await pool.query('SELECT * FROM Clients WHERE ID = $1', [id]);
    return result.rows[0];
};

const createClient = async (data) => {
    const { IdentificationID, Name, Email, AmountOfJobs, TotalScore } = data;
    const result = await pool.query(
        'INSERT INTO Clients (IdentificationID, Name, Email, AmountOfJobs, TotalScore) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [IdentificationID, Name, Email, AmountOfJobs, TotalScore]
    );
    return result.rows[0];
};

const updateClient = async (id, data) => {
    const { Name, Email } = data;
    const result = await pool.query(
        'UPDATE Clients SET Name = $1, Email = $2 WHERE ID = $3 RETURNING *',
        [Name, Email, id]
    );
    return result.rows[0];
};

const deleteClient = async (id) => {
    await pool.query('DELETE FROM Clients WHERE ID = $1', [id]);
    return { message: 'Cliente eliminado' };
};

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };
