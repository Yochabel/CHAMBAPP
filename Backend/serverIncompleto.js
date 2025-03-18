const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/chambeadores', require('./routes/chambeadoresRoutes'));
app.use('/api/clients', require('./routes/clientsRoutes'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
