require('dotenv').config();
const express = require('express');
const cors = require('cors');
const gradingRoutes = require('./routes/gradingRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/grading', gradingRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Grading service running on port ${PORT}`));
