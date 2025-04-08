const Router = require("express").Router()

const TestimonialRouter = require("../routes/TestimonialRoutes")
const UserRouter = require("../routes/UserRoutes")
const NewsletterRouter = require("../routes/NewsletterRoutes")
const ContactUsRouter = require("../routes/ContactUsRoutes")
const EnqueryRouter = require("../routes/EnqueryRoutes")



Router.use("/testimonial",TestimonialRouter)
Router.use("/user",UserRouter)

Router.use("/newsletter",NewsletterRouter)
Router.use("/contactus",ContactUsRouter)
Router.use("/enquery",EnqueryRouter)

module.exports=Router  