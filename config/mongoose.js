// Import necessary libraries and configuration
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Get the MongoDB connection string from environment variables
const uri = process.env.MONGODB_LOCAL_SERVER_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Set up event listeners
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Export the database connection for use in other parts of your application
export default db;
