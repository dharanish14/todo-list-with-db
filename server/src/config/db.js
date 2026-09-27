const mongoose = require('mongoose');
const dns = require('dns');

// Only set custom DNS on local machines (NOT on Vercel / Serverless where AWS VPC DNS is required)
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // Ignore
  }
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
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('[Database Error] MONGODB_URI is missing from environment variables!');
      throw new Error('MONGODB_URI environment variable is not defined.');
    }

    const isAtlas = mongoURI.includes('mongodb+srv');
    console.log(`[Database] Connecting to ${isAtlas ? 'MongoDB Atlas Cluster' : 'Local MongoDB'}...`);

    const opts = {
      serverSelectionTimeoutMS: 10000,
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
