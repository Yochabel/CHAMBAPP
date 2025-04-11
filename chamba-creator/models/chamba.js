const pool = require('../config/dbConfig');

// Crear nueva chamba
const createChamba = async (data) => {
  const {
    clientId,
    chambeadorId,
    servicio,
    descripcion,
    costAgreed
  } = data;

  const result = await pool.query(`
    INSERT INTO Chamba (
      Client_ID, Chambeador_ID, IsChambaActive, DateCreated,
      Servicio, Descripcion, CostAgreed
    ) VALUES ($1, $2, TRUE, NOW(), $3, $4, $5)
    RETURNING *;
  `, [clientId, chambeadorId, servicio, descripcion, costAgreed]);

  return result.rows[0];
};

// Otros métodos (update, cancel, etc.) se añaden luego

module.exports = {
  createChamba
};
