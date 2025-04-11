require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notificationsRoutes = require('./routes/notificationsRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/notifications', notificationsRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Notifications service running on port ${PORT}`));
