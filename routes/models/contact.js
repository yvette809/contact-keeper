const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ContactSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
       
    },

    phone:{
        type:String
    },
    type:{
        type: String,
        default:"personal"
    },
    password:{
        type:String,
        // required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});

const ContactModel = mongoose.model("contact", ContactSchema)
module.exports = ContactModel