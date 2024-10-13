// user.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
