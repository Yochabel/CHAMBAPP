const express = require('express');
const path = require("path");
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

//html routes
const frontEndRoute = path.resolve(__dirname, "../"); 
app.use(express.static(path.join(frontEndRoute, "Frontend")));
app.get("/", (req, res) => {
    res.sendFile(path.join(frontEndRoute, "public", "index.html"));
});

// Rutas
app.use('/api/chambeadores', require('./routes/chambeadoresRoutes'));
app.use('/api/clients', require('./routes/clientsRoutes'));
app.use('/api/chamba', require('./routes/chambaRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/sessions', require('./routes/sessionsRoutes')); 

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
