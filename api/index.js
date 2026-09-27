const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../server/src/config/db');
const todoRoutes = require('../server/src/routes/todoRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Database connection middleware for Vercel serverless functions
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Serverless DB Middleware Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Database connection failed: ' + err.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'TaskFlow Vercel Serverless Backend Connected',
    timestamp: new Date()
  });
});

app.use('/api/todos', todoRoutes);

module.exports = app;
