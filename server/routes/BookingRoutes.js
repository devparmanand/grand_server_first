const BookingRouter = require("express").Router()
// const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/BooikngController")

BookingRouter.post("/" ,createRecord)
BookingRouter.get("/",getAllRecord)
BookingRouter.get("/:_id",getSingleRecord)
BookingRouter.put("/:_id",updateRecord)   
BookingRouter.delete("/:_id", deleteRecord)   

module.exports=BookingRouter