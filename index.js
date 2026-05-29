const dotenv = require('dotenv');
const path = require('path');
// Solve path to local .env dynamically
dotenv.config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const growthController = require('./growth.controller');
const authController = require('./auth.controller');
const { protect } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_DB;
if (!mongoURI) {
    console.error("❌ MONGO_DB URI is missing in .env!");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('🌿 Connected to MongoDB Atlas successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Production-grade CORS configurations
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://growthgraph.netlify.app'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server calls)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS policy'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Auth Routes
app.post('/api/auth/signup', authController.signup);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/me', protect, authController.getProfile);

// Core Analysis Routes
app.post('/api/analyze', protect, growthController.analyzeProfile);
app.post('/api/suggest-projects', growthController.suggestProjects);

// History Routes
app.get('/api/history', protect, growthController.getHistory);
app.delete('/api/history/:id', protect, growthController.deleteAnalysis);
app.patch('/api/history/:id/step', protect, growthController.updateStepStatus);

app.get('/', (req, res) => {
  res.send('GrowthGraph AI API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

