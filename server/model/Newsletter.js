const mongoose = require("mongoose")

const NewsletterScheema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email Address  is Mandaitory"],
        unique:true
    },

    active:{
        type:Boolean,
        default:true
    }

})

const Newsletter = new mongoose.model("Newsletter",NewsletterScheema)

module.exports=Newsletter
