// models/Hotel.js
const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({
  room:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room",
    required:[true,"Room Type  Id is Mandaitory"],

},

 amenities:{
  type:String,
  required:[true,"Amenities   is Mandaitory"],

},
amenities1:{
  type:String,
  required:[true,"Amenities1  is Mandaitory"],

},
amenities2:{
  type:String,
  required:[true,"Amenities2   is Mandaitory"],

},
amenities3:{
  type:String,
  required:[true,"Amenities3   is Mandaitory"],

},
  description:{
    type:String,
    default:""
  },
//   stock:{
//      type:Number,
//     required:[true,"Stock is Mandatory"]
     
//   },
//   stockQuantity:{
//     type:Number,
//    required:[true,"Stock Quantity is Mandatory"]
    
//  },
 ratePerNight:{
  type:Number,
  required:[true,"Rate Per Night is Required"]
},
// numRooms:{
//  type:Number,
//  required:[true,"Number of Room is Required"]
// },
gst:{
type:Number,
required:[true,"Number of Room is Required"]
},

total:{
  type:Number,
  required:[true, "Total Amount Is Required"]
},
  // pic:{
  //   type:String,
  //   required:[true,"Pic is Mandatory"]
  // }
  pic:[

  ]
  // policies: {
  //  type: String,
  //  required:[true , "CancelPolicies is Manda"]
  // }
});
const Hotel = new mongoose.model("Hotel",HotelSchema)

module.exports = Hotel
