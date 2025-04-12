const HotelRouter = require("express").Router()
// const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/HotelController")

HotelRouter.post("/" ,createRecord)
HotelRouter.get("/",getAllRecord)
HotelRouter.get("/:_id",getSingleRecord)
HotelRouter.put("/:_id",updateRecord)   
HotelRouter.delete("/:_id", deleteRecord)   

module.exports=HotelRouter