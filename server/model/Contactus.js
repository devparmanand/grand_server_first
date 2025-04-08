const mongoose = require("mongoose")

const ContactUsScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name  is Mandaitory"],
       
    },
    email:{
        type:String,
        required:[true,"Email Address  is Mandaitory"],
       
    },
    phone:{
        type:String,
        required:[true,"Phone Number  is Mandaitory"],
       
    },
    subject:{
        type:String,
        required:[true,"Subject  is Mandaitory"],
       
    },
    message:{
        type:String,
        required:[true,"Message  is Mandaitory"],
       
    },
    date:{
        type:String,
        default:""
    },

    active:{
        type:Boolean,
        default:true
    }

})

const ContactUs = new mongoose.model("ContactUs",ContactUsScheema)

module.exports=ContactUs
