const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');
const connectDB = require('../server/src/config/db');
const todoRoutes = require('../server/src/routes/todoRoutes');

// Load environment variables
dotenv.config();

// Configure DNS for Atlas SRV lookup if needed
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore DNS set errors in serverless if restricted
}

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'TaskFlow Vercel Serverless Backend Connected',
    timestamp: new Date()
  });
});

app.use('/api/todos', todoRoutes);

module.exports = app;
