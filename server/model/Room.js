const mongoose = require("mongoose")

const RoomScheema = new mongoose.Schema({
  roomType:{
    type:String,
    required:[true,"Room Type  is Mandaitory"],

},
bedType:{
  type:String,
  required:[true,"Bed Type  is Mandaitory"],

},
available:{
  type:Boolean,
  default:true

},
    

    

})

const Room = new mongoose.model("Room",RoomScheema)

module.exports=Room
