const pool = require('../config/dbConfig');

// Buscar en Chambeadores o Clients según email
const findUserByEmail = async (email) => {
  const queryChambeador = `SELECT * FROM Chambeadores WHERE Email = $1`;
  const queryClient = `SELECT * FROM Clients WHERE Email = $1`;

  const chambeadorResult = await pool.query(queryChambeador, [email]);
  if (chambeadorResult.rows.length > 0) return { ...chambeadorResult.rows[0], role: 'chambeador' };

  const clientResult = await pool.query(queryClient, [email]);
  if (clientResult.rows.length > 0) return { ...clientResult.rows[0], role: 'cliente' };

  return null;
};

// Crear usuario en tabla correcta
const createUser = async (username, email, passwordHash, role) => {
  if (role === 'chambeador') {
    const result = await pool.query(`
      INSERT INTO Chambeadores (IdentificationID, FullName, Email, DateAccountCreated, location_postgis)
      VALUES ($1, $2, $3, NOW(), ST_GeogFromText('POINT(-103.3496 20.6597)'))
      RETURNING *, 'chambeador' as role;
    `, [generateID(), username, email]);
    return result.rows[0];
  }

  if (role === 'cliente') {
    const result = await pool.query(`
      INSERT INTO Clients (IdentificationID, FullName, Email, location_postgis)
      VALUES ($1, $2, $3, ST_GeogFromText('POINT(-103.3496 20.6597)'))
      RETURNING *, 'cliente' as role;
    `, [generateID(), username, email]);
    return result.rows[0];
  }

  if (role === 'admin') {
  const result = await pool.query(`
    INSERT INTO Clients (IdentificationID, FullName, Email, location_postgis)
    VALUES ($1, $2, $3, ST_GeogFromText('POINT(-103.3496 20.6597)'))
    RETURNING *, 'admin' as role;
  `, [generateID(), username, email]);
  return result.rows[0];
  }

  throw new Error('Invalid role');
};

const generateID = () => 'ID' + Math.floor(100000 + Math.random() * 900000);

module.exports = {
  createUser,
  findUserByEmail
};
