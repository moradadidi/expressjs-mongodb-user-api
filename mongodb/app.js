// app.js
const express = require('express');
const connectDB = require('./db'); // Import the database connection function
const User = require('./user');    // Import the User model

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Route to get users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


//get a single user
app.get('/users/:id',getUser,(req,res)=>{
    res.json(res.user);
});

// create a new user
app.post('/user', async (req, res) => {
const { name, email, password } = req.body;

// Validation: check if name, email, and password are provided
if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
}

const user = new User({
    name,
    email,
    password
});

try {
    const newUser = await user.save();
    res.status(201).json({
        user: newUser,
        message: "User created successfully",
        status: 201
    });
} catch (err) {
    console.error("Error:", err); // Log the exact error
    res.status(400).json({ message: err.message });
}
});


//update a user
app.patch('/user/:id',getUser,async(req,res)=>{
if(req.body.name!=null){
    res.user.name=req.body.name;
}
if(req.body.email!=null){
    res.user.email=req.body.email;
}
if(req.body.password!=null){
    res.user.password=req.body.password;
}
try{
    const updateUser = await res.user.save();
    res.json({
        user:updateUser,
        message: "User updated successfully",
        status: 200
    });
} catch(err){
    res.status(400).json({message:err});
}
});

//delete a user
app.delete('/user/:id', getUser, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully',
        status: 200
       });
    } catch (err) {
      console.error('Error deleting user:', err);  // Log the error for debugging
      res.status(500).json({ message: 'An error occurred while deleting the user', error: err.message });
    }
  });
  

//middleware function to get a single user by id

async function getUser(req,res,next){
    let user;
    try{
        user=await User.findById(req.params.id);
        if(user==null){
            return res.status(404).json({message:'User not found'});
        }
    } catch(err){
        return res.status(500).json({message:err});
    }
    res.user=user;
    next();
}

// Connect to the database, then start the server
connectDB().then(() => {
  app.listen(4000, () => {
    console.log('Server started at port 4000');
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
