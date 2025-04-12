const Hotel = require("../model/Hotel")
async function createRecord(req,res){
    try {
        const data = new Hotel(req.body)
        data.date = new Date()
        if(req.files){
            data.pic = Array.from(req.files).map((x)=>x.path)
        }
        await data.save()

      
        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
       const errorMessage=[]
        error.errors?.room ? errorMessage.push({room:error.errors.room.message}) : ""
        error.errors?.description ? errorMessage.push({description:error.errors.description.message}) : ""
        error.errors?.amenities ? errorMessage.push({amenities:error.errors.amenities.message}) : ""
        error.errors?.amenities1 ? errorMessage.push({amenities1:error.errors.amenities1.message}) : ""
        error.errors?.amenities2 ? errorMessage.push({amenities2:error.errors.amenities2.message}) : ""
        error.errors?.amenities3 ? errorMessage.push({amenities3:error.errors.amenities3.message}) : ""
        error.errors?.price ? errorMessage.push({price:error.errors.price.message}) : ""
        error.errors?.pic ? errorMessage.push({pic:error.errors.pic.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Hotel.find().sort({_id:-1})
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Hotel.findOne({_id:req.params._id})
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
        const data  = await Hotel.findOne({_id:req.params._id})
        if(data){
            data.description=req.body.description??data.description
            data.amenities=req.body.amenities??data.amenities
            data.amenities1=req.body.amenities1??data.amenities1
            data.amenities2=req.body.amenities2??data.amenities2
            data.amenities3=req.body.amenities3??data.amenities3
            data.price=req.body.price??data.price
            if(req.files){
                try {
                  data.oldPic.forEach((x , index)=>{
                    if(!(req.body.oldPic?.split(",").includes(x))){
                        const fs = require("fs")
                        fs.unlinkSync(x)
                    }

                    })

                } catch (error) {}
                if(req.body.oldPic===""){
                    data.pic = req.body.map((x)=>x.path)
                }
                else
                data.pic = req.body.oldPic?.split(",").concat(req.files.map((x)=>x.path))
                   
            }

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
        const data  = await Hotel.findOne({_id:req.params._id})
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



