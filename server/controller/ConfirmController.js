const Confirm = require("../Models/Confirm")
const Booking = require("../model/Booking")
const mailer =require("../mailer/index")

const  Razorpay = require ("razorpay")


// Payment Api

async function order(req,res){
    try {
        console.log(process.env.RPKEY);
         const  instance = new Razorpay({
            key_id : process.env.RPKEY,
            key_secret : process.env.RPSECRET_KEY
            
          });
          console.log(req.body.amount);
          
        const options = {
            amount : req.body.amount * 100,
            currency : "INR"
        };
        instance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error ,"RAZORPAY");
                return res.status(500).json({message:"Something went wrong"})                
            }
            res.status(200).json({data:order})
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log(error);
    }
}


async function verifyOrder(req,res){
    try {
        var check =await Confirm.findOne({_id:req.body.checkid})
        check.rppid = req.body.razorpay_payment_id
        check.paymentStatus="Done"
        check.paymentMode = "Net Banking"
        await check.save()
        res.status(200).json({result:"Done", message:"Payment Done Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}




async function createRecord(req,res){
    try {
                const data = await  new Confirm(req.body)
                data.date= new Date()
                await data.save()

                data.Bookings.forEach(async (x)=>{
                    let Booking = await Booking.findOne({_id : x.Booking})
                    Booking.stockQuantity = Booking.stockQuantity - x.qty
                    Booking.stock = Booking.stockQuantity - x.qty === 0 ? false :true
                    await Booking.save()
                });

              let check = await Confirm.findOne({_id:data._id}, {_id:0, user:1})
                             .populate({path:"user", select:"name -_id email "},
                             )
                let {user}= check
                mailer.sendMail({
                    from:process.env.EMAIL_SENDER,
                    to:user.email,
                    subject:"Team DECAELI: Your Order Has Been Placed",
                    html:
                      `<h4>
                             Dear ${user.name},
                           </h4>
                        <h4>Your Order Has been placed.</h4>
                        <h4> We’re happy to confirm that we’ve received your order. Below are the details of your purchase: </h4>

                    <p>We look forward to providing you with the best shopping experience</p>
                    <p>Thank you for choosing DECAELI. We hope you enjoy your shopping experience with us!</p> 
                            <br/>

                        Thanks & Regards,
                        <h2>Mr. Aditya Khanna </h2>
                        Fonder of DECAELI <br/>
                          www.decaeli.com
                       `
                            },(error)=>{
                            //   console.log(error);

                             })
              
                res.send({result:"Done", data:data, message:"Data Create successfully "})
           
    } catch (error) {

           const errorMessage ={}
           error.errors?.user ? errorMessage.user = error.errors.user.message:""       
           error.errors?.subtotal ? errorMessage.subtotal = error.errors.subtotal .message:""  
           error.errors?.shipping ? errorMessage.shipping = error.errors.shipping .message:""       
           error.errors?.total ? errorMessage.total = error.errors.total .message:""  
          
         Object.values(errorMessage).find(x=>x !=="")?
             res.status(500).send({result:"Fail", ...errorMessage})
             :
             res.status(500).send({result:"Fail", reason:"Internal server error"})
    }
}

async function getAllRecords (req, res){
    try {
        let data = await Confirm.find().sort({_id:-1}).populate([
            {path:"user", select:"name email phone pin address city state  "},
            {path:"Bookings.Booking", select:"name maincategory subcategory brand color size finalPrice pic stockQuantity",
                options:{slice:{pic:1}},     // this line used to any array from fetch single img 
                populate:[
                    {path:"maincategory", select:"name"},
                    {path:"brand", select:"name"},
                    {path:"subcategory", select:"name"},
                ]
            },
        ])
        res.send({result:"Done", count:data.length , data:data})
    } catch (error) {
        res.status(500).send({result:"fail", reason:"Internal server error"})
    }
}

async function getAllUserRecords (req, res){
    try {
        let data = await Confirm.find({user:req.params.userid}).sort({_id:-1}).populate([
            {path:"user", select:"name email phone pin address city state  "},
            {path:"Bookings.Booking", select:"name maincategory subcategory brand color size finalPrice pic stockQuantity",
                options:{slice:{pic:1}},     // this line used to any array from fetch single img 
                populate:[
                    {path:"maincategory", select:"name"},
                    {path:"brand", select:"name"},
                    {path:"subcategory", select:"name"},
                ]
            },
        ])
        res.send({result:"Done", count:data.length , data:data})
    } catch (error) {
        res.status(500).send({result:"fail", reason:"Internal server error"})
    }
}


async function getSingleRecord(req,res){
    try {
        let data = await Confirm.findOne({_id:req.params._id}).populate([
            {path:"user", select:"name email phone pin address city state  "},
            {path:"Bookings.Booking", select:"name maincategory subcategory brand color size finalPrice pic stockQuantity",
                options:{slice:{pic:1}},     // this line used to any array from fetch single img 
                populate:[
                    {path:"maincategory", select:"name"},
                    {path:"brand", select:"name"},
                    {path:"subcategory", select:"name"},
                ]
            },
        ])
        if(data)
            res.send({result:"Done", data:data})
        else
          res.status(500).send({result:"Fail", reason:"Invailid Id or Data Not Found"})
    } catch (error) {
         console.log(error);
         res.status(500).send({result:"fail", reason:"Internal Server error"})
    }
}


async function updateRecord(req,res){
    try {
        let data= await Confirm.findOne({_id:req.params._id})
        if(data){
                data.orderStatus = req.body.orderStatus ?? data.orderStatus
                data.paymentStatus = req.body.paymentStatus ?? data.paymentStatus
                data.paymentMode = req.body.paymentMode ?? data.paymentMode
                data.rppid = req.body.rppid ?? data.rppid
               await data.save()
     
               let  finalData = await Confirm.findOne({_id:data._id}).populate([
                {path:"user", select:"name email phone pin address city state  "},
                {path:"Bookings.Booking", select:"name maincategory subcategory brand color size finalPrice pic stockQuantity",
                    options:{slice:{pic:1}},     // this line used to any array from fetch single img 
                    populate:[
                        {path:"maincategory", select:"name"},
                        {path:"brand", select:"name"},
                        {path:"subcategory", select:"name"},
                    ]
                },
            ])

    let user = finalData.user
    
   mailer.sendMail({
   from:process.env.EMAIL_SENDER,
   to:user.email,
   subject:"Team DECAELI: Status of Your  Order Has Been Changed",
   html:
     `<h4>
            Dear ${user.name},
          </h4>
       <h4>Your Order Status Has been Chenged.</h4>
       <h4> We wanted to update you on the status of your order. Below are the details of your recent purchase: </h4>

      <p>Your Order Status : ${req.body.orderStatus}</p>
      <p>Thank you for choosing DECAELI. We hope you enjoy your shopping experience with us!</p> 
           <br/>

       Thanks & Regards,
       <h2>Mr. Aditya Khanna </h2>
       Founder and partner of DECAELI <br/>
        www.decaeli.com
      `
           },(error)=>{
           //   console.log(error);

            })


               res.send({result:"Done", data:finalData, message:"data update successfully"})
           
         
        }
        else
         res.status(500).send({result:"fail", reason:"Invalid id or Data not found"})
    } catch (error) {
        console.log(error);
         let errorMessage = []
       
          res.status(500).send({result:"fail", reason:"Internal server error"}) 
         
        
    }
}


async function deleteRecord(req, res){
    try {
        let data = await Confirm.findOne({_id:req.params._id})
        if(data){
            await data.deleteOne()
            res.send({result:"Done", message:"Data delete successfully "})
        }
        else
        res.status(500).send({result:"fail", reason:"Invailid Id or Data Not Found"})
       
    } catch (error) {
        res.status(500).send({result:"fail", reason:"Internal Server Error"})        
    }
}


module.exports={
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    getAllUserRecords,
    deleteRecord, 
    order,
    verifyOrder
}