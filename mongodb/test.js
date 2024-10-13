const express = require('express');
const mongoose = require('mongoose');
const app = express();

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Route to fetch users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Start the server after DB connection
mongoose.connect('mongodb://127.0.0.1:27017/my_database')
  .then(() => {
    console.log('Successfully connected to the my_database database');
    app.listen(4000, () => {
      console.log('Server started at port 4000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to my_database:', err);
  });
