const mongoose = require("mongoose")

const BookingScheema = new mongoose.Schema({
     name:{
        type:String,
        required:[true,"Name  is Mandaitory"],
     },
     email:{
        type:String,
        required:[true,"Name  is Mandaitory"],
     },
     phone:{
        type:String,
        required:[true,"Name  is Mandaitory"],
     },
    hotel:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Hotel",
       required:[true,"Hotel Room  Id is Mandaitory"],
   
   },
    
    // room:{
    //     type:String,
    //     required:[true,"Room Type  is Mandaitory"],
       
    // },
    checkIn:{
        type:String,
        required:[true,"Check In Date  is Mandaitory"],
       
    },

    checkOut:{
        type:String,
        required:[true,"Check Out Date  is Mandaitory"],
       
    },

    adult:{
        type:Number,
        // required:[true,"Adult  is Mandaitory"],
        required:[true, "Adult Is Required"]



       
    },
    child:{
        type:Number,
        required:[true, "Child Amount Is Required"]

    },
    qty:{
        type:Number,
        required:[true, "Room Quantity Is Required"]

    },
     
    date:{
        type:String,
        default:""
    },
    ratePerNight:{
         type:Number,
         required:[true,"Rate Per Night is Required"]
    },
    numRooms:{
        type:Number,
        required:[true,"Number of Room is Required"]
   },
   gst:{
    type:Number,
    required:[true,"Number of Room is Required"]
},
    total:{
        type:Number,
        required:[true, "Total Amount Is Required"]
    }

   

})

const Booking = new mongoose.model("Booking",BookingScheema)

module.exports=Booking
