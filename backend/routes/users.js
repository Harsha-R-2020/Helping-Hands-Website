const router = require('express').Router();
let User = require('../models/user.model');
let Otp = require('../models/otp.model');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

require('dotenv').config();
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({error:"Some error occured"}));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const mail=req.body.mail;
  const password=req.body.password;
  if(!username || !mail || !password){
    return res.status(422).json({error:"Mandatory fields"})
  }
  else if(!username.match(/^[a-zA-Z ]*$/)){
    return res.status(422).json({error:"Name should only contain alphabets"})
  }
  else if(!mail.match(/^[0-9a-zA-Z]*[@]{1}[a-zA-Z]{3,}[\.]{1}[a-zA-Z]{2,}$/)){
    return res.status(422).json({error:"Bad formatted email"})
  }
  else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/)){
    return res.status(422).json({error:"Password is not strong enough"})
  }
  User.findOne({mail:mail}).then((savedMail) => {
    if(savedMail){
        return res.status(422).json({error:"User with the given Mail ID already exist"})
    }
    else{
      const newUser = new User({
        username,
        mail,
      password,
      });
      newUser.save()
      .then(() => res.json({message:'User added!'}))
      .catch(err => res.status(400).json({error:"Some error ocurred"}));
    }
  })
});
router.route('/change').post((req, res) => {
  const mail=req.body.mail;
  const password=req.body.password;
  const otp=req.body.otp;
  if(!mail){
    return res.status(500).json({error:"Bad session",redirect:"/home"})
  }
  if(!otp || !password){
    return res.status(422).json({error:"Mandatory fields"})
  }
  else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/)){
    return res.status(422).json({error:"Password is not strong enough"})
  }
  Otp.findOne({ $and: [{ mail:mail }, { token:otp }] }).then((correct) => {
    if(correct.time.getTime()>=Date.now()){
        User.findOne({mail:mail}).then((user)=>{
          user.password=password;
          user.save().then(() => res.json({message:"Password Set Successfully"}))
          .catch(err => res.status(400).json({error:"Internal Server Error"}));
        })
    }
    else{
      return res.status(400).json({error:"Otp Expired"});
    }
  }).catch(err=> res.status(400).json({error:"Incorrect OTP"}));
});
router.route('/search').post((req, res) => {
  const mail=req.body.mail;
  const password=req.body.password;
  if(!mail || !password){
    return res.status(422).json({error:"Mandatory fields"})
  }
  else if(!mail.match(/^[0-9a-zA-Z]*[@]{1}[a-zA-Z]{3,}[\.]{1}[a-zA-Z]{2,}$/)){
    return res.status(422).json({error:"Bad formatted email"})
  }
  User.findOne({ $and: [{ mail:mail }, { password: password }] }).then((foundUser) => {
    if(foundUser){
        return res.json({message:"Redirecting to homepage..", name:mail})
    }
    else{
      return res.status(400).json({error:"Invalid Credentials"});
    }
  }).catch(err=>{ res.status(400).json({error:"Unknown error encountered"});})
});
router.route('/forgot').post((req, res) => {
  const mail=req.body.mail;
  if(!mail){
    return res.status(422).json({error:"Mandatory fields"})
  }
  else if(!mail.match(/^[0-9a-zA-Z]*[@]{1}[a-zA-Z]{3,}[\.]{1}[a-zA-Z]{2,}$/)){
    return res.status(422).json({error:"Bad formatted email"})
  }
  User.findOne({mail:mail}).then((savedMail) => {
    if(savedMail){
        const ran = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const token=ran.toString();
        const time = Date.now() + 3600000;
        const newOtp = new Otp({
          mail,
          token,
          time,
        });
        newOtp.save()
        .then(() => {
          const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
          const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
          sendSmtpEmail.to = [{ "email": mail }];
          sendSmtpEmail.templateId =1 ;
          sendSmtpEmail.params = {
            "email": mail,
            "token": token
          };
          apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
            res.json({ message: "Password reset email sent",mail:mail});
          }).catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error sending email" });
          });
      })
        .catch(err => res.status(400).json({error:err+"Some error ocurred"}));
    }
    else{
        return res.status(400).json({error:"User not exists"});
    }
  })
});
module.exports = router;