const Booking = require("../model/Booking")
async function createRecord(req,res){
    try {
        const data = new Booking(req.body)
        await data.save()

      
        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
       const errorMessage=[]
        error.errors?.user ? errorMessage.push({user:error.errors.user.message}) : ""
        error.errors?.hotel ? errorMessage.push({hotel:error.errors.hotel.message}) : ""
        error.errors?.checkInDate ? errorMessage.push({checkInDate:error.errors.checkInDate.message}) : ""
        error.errors?.checkOutDate ? errorMessage.push({checkOutDate:error.errors.checkOutDate.message}) : ""
        error.errors?.adult ? errorMessage.push({adult:error.errors.adult.message}) : ""
        error.errors?.child ? errorMessage.push({child:error.errors.child.message}) : ""
        error.errors?.qty ? errorMessage.push({qty:error.errors.qty.message}) : ""
        error.errors?.total ? errorMessage.push({total:error.errors.total.message}) : ""

        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Booking.find().sort({_id:-1})
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Booking.findOne({_id:req.params._id})
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
        const data  = await Booking.findOne({_id:req.params._id})
        if(data){
            data.checkInDate=req.body.checkInDate??data.checkInDate
            data.checkOutDate=req.body.checkOutDate??data.checkOutDate
            data.qty=req.body.qty??data.qty
            data.total=req.body.total??data.total
            data.adult=req.body.adult??data.adult
            data.child=req.body.child??data.child
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
        const data  = await Booking.findOne({_id:req.params._id})
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



