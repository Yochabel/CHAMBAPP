const express = require('express');
const app = express();
const jobRoutes = require('./routes/jobRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Follow-Through-A-Job service running on port ${PORT}`);
});
