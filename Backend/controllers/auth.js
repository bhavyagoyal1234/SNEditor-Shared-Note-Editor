const User = require("../models/user");
const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});

// const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);


// Register new user 
 
exports.register = async (req, res, next) => {  
    const {   email, password } = req.body; 
    
    const filteredBody = {
       
        email
    }; 
    const existing_user = await User.findOne({ email: email });
  
    if (existing_user) {
      res.status(400).json({
        status: "error",
        message: "Email is already in use ,Please login",
      });
    } else {
      const new_user = await User.create(filteredBody);
      new_user.password=password;
      await new_user.save({ new: true, validateModifiedOnly: true });
      
      res.status(200).json({
        status: "success",
        message: "User created",
        user_id:new_user._id,
        email:new_user.email
      });
    }
  };

  
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "error",
        message: "Both Email and Password are required",
      });
    }
    const user = await User.findOne({ email: email });
    if(!user){
      res.status(400).json({
        status: "error",
        message: "Email does not exist. Please Register ",
      });
      return;
    }
   else if ( user.password!=password) {
      res.status(400).json({
        status: "error",
        message: "Email or password is incorrect",
      });
      return;
    }
    // const token = signToken(user._id); 
    res.status(200).json({
      status: "Success",
      message: "Logged in succesfully",  
      firstName:user.firstName,
      user_id:user._id,
      email:user.email
    });
  }; 
