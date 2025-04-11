const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db', // nombre del contenedor de la DB en docker-compose
  database: 'chambapp',
  password: 'example',
  port: 5432,
});

module.exports = pool;
