const mongoose = require("mongoose");



const notesSchema = new mongoose.Schema({
  title:{
    type:String
  },
    data:{
        type:String,
        required:[true,"Something should be written"],
    }, 
    main:{type:String},
    emails:[{type:String}],
  });  

const Note = new mongoose.model("Notes", notesSchema);
module.exports = Note;