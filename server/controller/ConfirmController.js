const Confirm = require("../model/Confirm")
async function createRecord(req,res){
    try {
        const data = new Confirm(req.body)
        data.date = new Date()
        await data.save()

      
        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
       const errorMessage=[]
        error.errors?.booking ? errorMessage.push({booking:error.errors.booking.message}) : ""
        error.errors?.subtotal ? errorMessage.push({subtotal:error.errors.subtotal.message}) : ""
        error.errors?.gst ? errorMessage.push({gst:error.errors.gst.message}) : ""
        error.errors?.total ? errorMessage.push({total:error.errors.total.message}) : ""

        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Confirm.find().sort({_id:-1})
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Confirm.findOne({_id:req.params._id})
        if(data)
          res.send({result:"Done",data:data})  
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function updateRecord(req,res){
     try {
        const data  = await Confirm.findOne({_id:req.params._id})
        if(data){
            data.total=req.body.total??data.total
            await data.save()


        res.send({result:"Done",message:"Record Updated, Successfully"})  
               }
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function deleteRecord(req,res){
    try {
        const data  = await Confirm.findOne({_id:req.params._id})
        if(data){
          if(data.active){
            res.send({result:"Fail" ,reason:"Can't Delete Active Contact Us Query"})
          }
          else{
            await data.deleteOne()
            res.send({result:"Done",reason:"Record is Deleted"})  
          }
        }
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

module.exports={
    createRecord,
    getAllRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
}



