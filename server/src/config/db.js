const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore DNS override errors in serverless
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db';
    const isAtlas = mongoURI.includes('mongodb+srv');

    console.log(`[Database] Connecting to ${isAtlas ? 'MongoDB Atlas Cluster' : 'Local MongoDB Instance'}...`);

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose.connect(mongoURI, opts).then((mongooseInstance) => {
      console.log(`[Database] Connected successfully! Host: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    }).catch(err => {
      console.error(`[Database Error] Connection failed: ${err.message}`);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;
