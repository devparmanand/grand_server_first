const Router = require("express").Router()

const TestimonialRouter = require("../routes/TestimonialRoutes")
const UserRouter = require("../routes/UserRoutes")
const NewsletterRouter = require("../routes/NewsletterRoutes")
const ContactUsRouter = require("../routes/ContactUsRoutes")
const EnqueryRouter = require("../routes/EnqueryRoutes")
const HotelRouter = require("../routes/HotelRoutes")
const RoomRouter = require("../routes/RoomRoutes")
const BookingRouter = require("./BookingRoutes")
const ConfirmRouter = require("./ConfirmRoutes")
// const SelectRoomRouter = require("../routes/SelectRoomRoutes")



Router.use("/testimonial",TestimonialRouter)
Router.use("/user",UserRouter)

Router.use("/newsletter",NewsletterRouter)
Router.use("/contactus",ContactUsRouter)
Router.use("/enquery",EnqueryRouter)
Router.use("/room",RoomRouter)
Router.use("/roomcart",HotelRouter)
Router.use("/booking",BookingRouter)
Router.use("/confirm",ConfirmRouter)
// Router.use("/selectroom",SelectRoomRouter)


module.exports=Router  