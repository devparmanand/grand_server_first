const ContactUsRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/ContactusController")

ContactUsRouter.post("/" ,createRecord)
ContactUsRouter.get("/" , getAllRecord)
ContactUsRouter.get("/:_id" , getSingleRecord)
ContactUsRouter.put("/:_id",verifyAdmin,)   
ContactUsRouter.delete("/:_id", verifyAdmin, deleteRecord)   

module.exports=ContactUsRouter