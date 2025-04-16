const mongoose = require("mongoose")

const EnqueryScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory"],
        
    },
    email:{
        type:String,
        required:[true,"Email is Mandatory"]
    }
    ,
    phone:{
        type:Number,
        required:[true , "Phone is Mandatory"],
    }
    ,

    event:{
        type:String,
        required:[true, "Event Type is Mandatory"]
    },
    guest:{
        type:Number,
        required:[true,"Number of Guest is Mandatory"]
    },
    room:{
        type:Number,
        required:[true,"Number of Room is Mandatory"]
    },


})


const Enquery = new mongoose.model("Enquery",EnqueryScheema)

module.exports = Enquery

