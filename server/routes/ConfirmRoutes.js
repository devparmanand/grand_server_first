const ConfirmRouter = require("express").Router()
// const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord,  deleteRecord} 
 = require("../controller/ConfirmController")

ConfirmRouter.post("/" ,createRecord)
ConfirmRouter.get("/",getAllRecord)
ConfirmRouter.get("/:_id",getSingleRecord)
ConfirmRouter.put("/:_id",updateRecord)   
// ConfirmRouter.get("/:_id",verifyBoth, getSingleRecord)
// ConfirmRouter.put("/:_id",verifyAdmin, updateRecord)
// ConfirmRouter.delete("/:_id",verifyAdmin, deleteRecord)
// ConfirmRouter.post("/orders", order)
// ConfirmRouter.post("/verify", verifyOrder)

ConfirmRouter.delete("/:_id",  deleteRecord)   

module.exports=ConfirmRouter