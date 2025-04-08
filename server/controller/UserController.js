const User = require("../model/User");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const mailer = require("../mailer");
const { error } = require("console");
const jwt = require("jsonwebtoken");
// Create a schema
var schema = new passwordValidator()
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase(1) // Must have 1 uppercase letters
  .has()
  .lowercase(1) // Must have 1 lowercase letters
  .has()
  .digits(1) // Must have 1  digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

async function createRecord(req, res) {
  // if (schema.validate(req.body.password)) {
  //   const data = new User(req.body);
  //   bcrypt.hash(req.body.password, 12, async (error, hash) => {
  //     if (error) {
  //       res
  //         .status(500)
  //         .send({
  //           result: "Fail",
  //           reason: "Internal Server Error ! Hash Password Doesn't Generated",
  //         });
  //     } else
        try {
          let data = new User(req.body)
          // data.role = "Buyer";
          // data.password = hash;
          await data.save();

          mailer.sendMail({
            from: process.env.EMAIL_SENDER,
            to: data.email,
            subject: "Account is Created: Team Ecom",
            text: `
             Hello ${data.name} 
             Your Account With Us Has Been Created
             Now You Can Buy Our Latest Products With great deals 
             Team:Ecom
             `,
          });
    
        jwt.sign({data},process.env.JWT_SECRET_KEY_BUYER ,(error,token)=>{
          if(error)
            res.status(500).send({result:"Fail" , reason:"Internal Server Error"})
          else
          res.send({result:"Done" , data:data , token:token , message:"Record is created, Successfully"})
        })
        } catch (error) {
          console.log(error);

          const errorMessage = {};

          error.keyValue?.username? errorMessage.username =  "User Name is Already Exist" : ""
          error.keyValue?.email? errorMessage.email =  "Email Address is Already Exist" : ""
          error.errors?.name? errorMessage.name =  error.errors.name.message : ""
          error.errors?.username? errorMessage.message = error.errors.username.message : ""
          error.errors?.email? errorMessage.email = error.errors.email.message : ""
          error.errors?.phone? errorMessage.phone = error.errors.phone.message : ""
          error.errors?.password? errorMessage.password =  error.errors.password.message : ""
          
       Object.values(errorMessage).filter((x)=>x!=="").length === 0?
           res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
            : res.send({ result: "Fail", reason: errorMessage });
        }
  //   });
  // } else
  //   res.send({
  //     result: "Fail",
       
  //     reason:{password: "Invalid Password !!! Password Must Contains atleast 1 Digit , 1 Uppercase, 1 Lowercase Character and Should not contain any space and length must be within 8-100",}
  //   });
}

async function getAllRecord(req, res) {
  try {
    const data = await User.find().sort({ _id: -1 });
    res.send({ result: "Done", cont: data.length, data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function getSingleRecord(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.send({ result: "Fail", reason: "Invalid Id, Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function updateRecord(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name ?? data.name;
      data.phone = req.body.phone ?? data.phone;
      data.address = req.body.address ?? data.address;
      data.pin = req.body.pin ?? data.pin;
      data.city = req.body.city ?? data.city;
      data.state = req.body.state ?? data.state;
      data.active = req.body.active ?? data.active;
      if (req.file) {
        try {
          const fs = require("fs");
          fs.unlinkSync(data.pic);
        } catch (error) {
          data.pic = req.file.path;
        }
      }
      await data.save();
      res.send({ result: "Done", message: "Record Updated, Successfully" });
    } else res.send({ result: "Fail", reason: "Invalid Id, Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
    const errorMessage = [];

    error.keyValue?.name
      ? errorMessage.push({ name: "User Name is Already Exist" })
      : "";
    error.errors?.name
      ? errorMessage.push({ name: error.errors.name.message })
      : "";
    errorMessage.length === 0
      ? res
          .status(500)
          .send({ result: "Fail", reason: "Internal Server Error" })
      : res.status(500).send({ result: "Fail", reason: errorMessage });
  }
}

async function deleteRecord(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      if (req.file) {
        try {
          const fs = require("fs");
          fs.unlinkSync(data.pic);
        } catch (error) {
          data.pic = req.file.path;
        }
      }
      await data.deleteOne();
      res.send({ result: "Done", reason: "Record is Deleted" });
    } else res.send({ result: "Fail", reason: "Invalid Id, Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    }); 
    if (data && await bcrypt.compare(req.body.password, data.password)) {
      let secretkey =
        data.role === "Buyer"
          ? process.env.JWT_SECRET_KEY_BUYER
          : process.env.JWT_SECRET_KEY_ADMIN;
          // ,{ expiresIn: 60 * 60 * 24 * 7 }
      jwt.sign({ data },secretkey,(error, token) => {
          if (error) 
            res.status(500).send({result:"Fail", reason:"Internal Server"})
           else 
           res.send({ result: "Done", data: data, token: token });
         })
         }
       else
   res.status(401).send({ result: "Fail", reason: "User Name or Password Invalid" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
async function forgetPassowrd1(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    console.log(data);
    
    if (data) {
      let otp = parseInt(
        Math.floor(Math.random() * 1000000)
          .toString()
          .padEnd(6, "1")
      );
      data.otp = otp;
      await data.save();

      mailer.sendMail({
        from: process.env.EMAIL_SENDER,
        to: data.email,
        subject: "OTP for Password Reset: Team Ecom",
        text: `
             Hello ${data.name} 
             We Recieved an Record for Password Reset  Your Side 
             OTP for Password Reset is ${otp}
             Never Share OTP With Anyone
             Team:Ecom
             `,
      });

      res.send({
        result: "Done",
        message: "Otp Has Been Sent Your Registered Email Adress",
      });
    } else {
      res
        .status(401)
        .send({
          result: "Fail",
          reason: "Invalid Credential !!! User Not Found",
        });
    }
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function forgetPassowrd2(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    console.log(data);
    console.log(req.body.username);
    
    
    if (data) {
      if (data.otp == req.body.otp) res.send({ result: "Done" });
      else res.send({ result: "Fail", reason: "Invalid OTP" });
    } else {
      res.send({result:"Fail" , reason:"Un Authorised Activity"})
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).send({ result: "Fail", reason: "Internal Server Error"});
}
}

async function forgetPassowrd3(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (data) {
      bcrypt.hash(req.body.password, 12, async (error, hash) => {
        if (error)
          res
            .status(500)
            .send({ result: "Fail", reason: "Internal Server Error" });
        else {
          data.password = hash;
          await data.save();

          res.send({ result: "Done", reason: "Your Password Has Been Reset" });
        }
      });
    } else {
      res.status(401).send({ result: "Fail", reason: "UnAuthorised Activity" });
    }
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
module.exports = {
  createRecord,
  getAllRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
  login,
  forgetPassowrd1,
  forgetPassowrd2,
  forgetPassowrd3,
};
