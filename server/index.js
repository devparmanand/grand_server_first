const express = require("express")
const dotenv = require("dotenv").config()
const Router = require("./routes/index")
const path = require("path")
const cors = require("cors")

const app =  express()

var whitelist = ['http://localhost:3000' , 'http://localhost:8000']

var corsOptions = {
    origin: function (origin, callback) {
      console.log("Origin",origin);
      
      if (whitelist.includes(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('You are not Authenticated , Not Allow to Access this api'))
      }
    }
  }


require("./db_connect")

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api",Router)
// app.use(express.static("./public"))
app.use("/public",express.static("./public"))

let PORT = process.env.PORT || 8000


app.listen(PORT,console.log(`Server is Running at port ${PORT}`))
