require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chambaRoutes = require('./routes/chambaRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/chamba', chambaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Chamba Creator service running on port ${PORT}`));
