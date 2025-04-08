const mongoose = require("mongoose")

const TestimonialScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Testimonial Name  is Mandaitory"],

    },

    message:{
        type:String,
        required:[true,"Testimonial Message  is Mandaitory"],
    },
    pic:{
        type:String,
        required:[true,"Testimonial Pic  is Mandaitory"],
    },

   

    active:{
        type:Boolean,
        default:true
    }

})

const Testimonial = new mongoose.model("Testimonial",TestimonialScheema)

module.exports=Testimonial
