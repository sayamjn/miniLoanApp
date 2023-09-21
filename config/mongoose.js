import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Replace 'your_connection_string_here' with your actual MongoDB connection string
const uri = process.env.MONGODB_LOCAL_SERVER_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

export default db;