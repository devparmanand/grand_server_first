const RoomRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/RoomController")

RoomRouter.post("/"  ,createRecord)
RoomRouter.get("/" ,verifyAdmin,getAllRecord)
RoomRouter.get("/:_id" ,verifyAdmin,getSingleRecord)
RoomRouter.put("/:_id",verifyAdmin, updateRecord)   
RoomRouter.delete("/:_id", verifyAdmin, deleteRecord)   

module.exports=RoomRouter