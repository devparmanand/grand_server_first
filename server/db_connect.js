const mongoose  = require("mongoose")


async function getConnect(){
    
//  await   mongoose.connect(process.env.DB_URI)
 await   mongoose.connect("mongodb://localhost:27017/ecom_server_first")

.then(()=>{
    console.log("Database is Connected");
    
})
.catch((error)=>{
    console.log(error)
})
}
getConnect()




