const Note = require("../models/notes");
const Notes = require("../models/notes");
const User = require("../models/user");
const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});


exports.createNotes = async (req, res, next) => {  
    const data  = req.body; 

    if(data.note_id=="not"){
      const user = await User.findById(data.user_id);
      const newNotes=await Notes.create({title:data.title,data:data.data,main:user.email});
  
      res.status(200).json({
      status: "Success",
      message: "Notes Added",
      note_id:newNotes._id,
      }); 
  } 
        else{
    const existingnotes= await Notes.findById(data.note_id);
     if(!existingnotes){
      const user = await User.findById(data.user_id);
      const newNotes=await Notes.create({title:data.title,data:data.data,main:user.email});
  
      res.status(200).json({
      status: "Success",
      message: "Notes Added",
      note_id:newNotes._id,
      });
     }
     else{
            existingnotes.data=data.data;
            existingnotes.title=data.title;
          await  existingnotes.save();
            // existingnotes.email.push(data.email);
            res.status(200).json({
                status: "Success",
                message: "Notes Updated",
                note_id:existingnotes._id
                });}
        }
    
   
  };
  exports.updateUsers = async (req, res, next) => {  
    const {email,note_id}=req.body;
    const notes=await Notes.findById(note_id); 
    notes.emails.push(email);
   await notes.save();
    res.status(200).json({
        status: "Success",
        message: "Memebers Added",
        email,
      });
    
   
  };
  exports.getNotes = async (req, res, next) => {  

    const notes=await Notes.find();
     res.status(200).json({
        status: "Success",
        message: "notes",
        data:notes, 
      });
    
   
  };