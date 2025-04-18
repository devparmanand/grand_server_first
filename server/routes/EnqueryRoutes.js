const EnqueryRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/EnqueryController")

EnqueryRouter.post("/" ,createRecord)
EnqueryRouter.get("/",getAllRecord)
EnqueryRouter.get("/:_id",getSingleRecord)
EnqueryRouter.put("/:_id",verifyAdmin,)   
EnqueryRouter.delete("/:_id", verifyAdmin, deleteRecord)   

module.exports=EnqueryRouter