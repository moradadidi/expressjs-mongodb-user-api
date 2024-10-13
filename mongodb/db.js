// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/my_database');
    console.log('Successfully connected to the my_database database');
  } catch (err) {
    console.error('Error connecting to my_database:', err);
    process.exit(1); // Exit if the connection fails
  }
};

// Export the connectDB function
module.exports = connectDB;
