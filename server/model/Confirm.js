const mongoose = require("mongoose")

const ConfirmSchema = new mongoose.Schema({
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:[true, "Booking Id Is Required"],
    },
    bookingStatus:{
        type:String,
        default:"Booking is Confirm"
        },
    paymentMode:{
        type:String,
        default:"COD"
     },
     paymentStatus:{
        type:String,
        default:"Pending"
     },
     subtotal:{
        type:Number,
        required:[true, "Subtotal Amount is Required"]
    },
    gst:{
        type:Number,
        required:[true, "Gst Amount is Required"]
    },
    total:{
        type:Number,
        required:[true, " Total Amount is Required"]
    },
    rppid:{
        type:String,
       default:"283jefu8311dyyyryryr"
    },
    date:{
        type:String,
       default:""
    },
//    hotels:[
//     {
//         hotel:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"Hotel",
//             required:[true, "Hotel Id Is Required"],
//         },
//         qty:{
//             type:Number,
//             required:[true, "Hotel Room Quantity is Required"]
//         },
//         total:{
//             type:Number,
//             required:[true, "Total Amount Is Required"]
//         }
      
//     }
//    ]
    
})

const Confirm = new mongoose.model("Confirm", ConfirmSchema)
module.exports = Confirm;