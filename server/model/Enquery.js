const mongoose = require("mongoose")

const EnqueryScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory"],
        
    },
    eamil:{
        type:String,
        required:[true,"Email is Mandatory"]
    }
    ,
    phone:{
        type:String,
        required:[true , "Phone is Mandatory"],
    }
    ,
    location:{
        type:String,
        required:[true , "Location is Mandatory"]
    },
    date:{
        type:String,
        required:[true,"Date is Mandatory"],
    
    },
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

