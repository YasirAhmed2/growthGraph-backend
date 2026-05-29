const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const growthController = require('./growth.controller');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/analyze', growthController.analyzeProfile);
app.post('/api/suggest-projects', growthController.suggestProjects);


app.get('/', (req, res) => {
  res.send('GrowthGraph AI API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
