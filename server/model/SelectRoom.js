// models/Hotel.js
const mongoose = require('mongoose');
const SelectRoomScheema = new mongoose.Schema({
  room:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room",
    required:[true,"Room Type  Id is Mandaitory"],

},

 amenities:{
  type:String,
  required:[true,"Amenities  Id is Mandaitory"],

},
amenities1:{
  type:String,
  required:[true,"Amenities1  Id is Mandaitory"],

},
amenities2:{
  type:String,
  required:[true,"Amenities2  Id is Mandaitory"],

},
amenities3:{
  type:String,
  required:[true,"Amenities3  Id is Mandaitory"],

},
  description:{
    type:String,
    default:""
  },
  price:{
    type:Number,
    required:[true,"Price is Mandatory"]
  },
  pic:{
    type:String,
    required:[true,"Pic is Mandatory"]
  }
  // policies: {
  //  type: String,
  //  required:[true , "CancelPolicies is Manda"]
  // }
});
const SelectRoom = new mongoose.model("Review",SelectRoomScheema)

module.exports = SelectRoom
