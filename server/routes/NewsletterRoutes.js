const NewsletterRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/NewsletterController")

NewsletterRouter.post("/"  ,createRecord)
NewsletterRouter.get("/" ,verifyAdmin,getAllRecord)
NewsletterRouter.get("/:_id" ,verifyAdmin,getSingleRecord)
NewsletterRouter.put("/:_id",verifyAdmin, updateRecord)   
NewsletterRouter.delete("/:_id", verifyAdmin, deleteRecord)   

module.exports=NewsletterRouter