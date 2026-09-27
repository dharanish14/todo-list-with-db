const mongoose = require('mongoose');
const dns = require('dns');

// Configure fallback DNS resolvers (Google & Cloudflare) for Windows SRV lookup
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('[DNS Warning] Could not set custom DNS servers:', e.message);
}

const connectDB = async () => {

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db';
    const isAtlas = mongoURI.includes('mongodb+srv');
    
    console.log(`[Database] Attempting connection to ${isAtlas ? 'MongoDB Atlas Cluster' : 'Local MongoDB Instance'}...`);
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[Database] MongoDB Connected Successfully! Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    console.error(`[Database Hint] Check your MONGODB_URI in .env or ensure MongoDB server/Atlas IP whitelist allows this connection.`);
  }
};

module.exports = connectDB;
