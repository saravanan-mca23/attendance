const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
    name:{
        type:String,
        requried: true
    },

    email:{
        type:String,
        requried: true
    },

  

    password:{
        type:String,
        requried: true
    },

   
  
}, {timestamps: true});

const Hod = new mongoose.model("Hod", hodSchema);

module.exports = Hod;