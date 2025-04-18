const RoomRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/RoomController")

RoomRouter.post("/"  ,createRecord)
RoomRouter.get("/" ,getAllRecord)
RoomRouter.get("/:_id" ,getSingleRecord)
RoomRouter.put("/:_id", updateRecord)   
RoomRouter.delete("/:_id",  deleteRecord)   

module.exports=RoomRouter