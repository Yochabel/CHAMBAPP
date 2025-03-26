const pool = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const getUsers = async () => {
    const result = await pool.query('SELECT ID, Username, Role FROM Users');
    return result.rows;
};

const getUserById = async (id) => {
    const result = await pool.query('SELECT ID, Username, Role FROM Users WHERE ID = $1', [id]);
    return result.rows[0];
};

const getUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM Users WHERE Username = $1', [username]);
    return result.rows[0];
};

const createUser = async (data) => {
    const { Username, Password, Role } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const result = await pool.query(
        `INSERT INTO Users (Username, PasswordHash, Role, DateCreated) 
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING ID, Username, Role`,
        [Username, hashedPassword, Role]
    );
    return result.rows[0];
};


const updateUser = async (id, data) => {
    const { Username, Role } = data;
    const result = await pool.query(
        'UPDATE Users SET Username = $1, Role = $2 WHERE ID = $3 RETURNING ID, Username, Role',
        [Username, Role, id]
    );
    return result.rows[0];
};

const deleteUser = async (id) => {
    await pool.query('DELETE FROM Users WHERE ID = $1', [id]);
    return { message: 'Usuario eliminado' };
};

module.exports = { getUsers, getUserById, getUserByUsername, createUser, updateUser, deleteUser };
