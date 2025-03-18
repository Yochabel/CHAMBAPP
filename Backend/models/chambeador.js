const pool = require('./db');

const getChambeadores = async () => {
    const result = await pool.query('SELECT * FROM Chambeadores');
    return result.rows;
};

const getChambeadorById = async (id) => {
    const result = await pool.query('SELECT * FROM Chambeadores WHERE ID = $1', [id]);
    return result.rows[0];
};

const createChambeador = async (data) => {
    const { IdentificationID, Name, Email, Profile, ServicesOffered } = data;
    const result = await pool.query(
        'INSERT INTO Chambeadores (IdentificationID, Name, Email, Profile, ServicesOffered) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [IdentificationID, Name, Email, Profile, ServicesOffered]
    );
    return result.rows[0];
};

const updateChambeador = async (id, data) => {
    const { Name, Email, Profile } = data;
    const result = await pool.query(
        'UPDATE Chambeadores SET Name = $1, Email = $2, Profile = $3 WHERE ID = $4 RETURNING *',
        [Name, Email, Profile, id]
    );
    return result.rows[0];
};

const deleteChambeador = async (id) => {
    await pool.query('DELETE FROM Chambeadores WHERE ID = $1', [id]);
    return { message: 'Chambeador eliminado' };
};

module.exports = { getChambeadores, getChambeadorById, createChambeador, updateChambeador, deleteChambeador };
