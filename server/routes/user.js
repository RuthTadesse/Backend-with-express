import express from "express";
import bcryt from "bcrypt";
import jwt from 'jsonwebtoken';
const router = express.Router();
import { User } from "../models/user.js";
import { OTP } from "../models/OtpVerfication.js";
import nodemailer from 'nodemailer';
import otpGenerator from "otp-generator";
import moment from "moment";

//nodemailer

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "davidkindea1221@gmail.com", 
      pass: "mwcg xpsa sxge ditg", 
    },
  
  });




// Sign Up
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received signup request:', req.body);
  
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.json({ status: false, message: "User already exists" });
      }
  
      const hashPassword = await bcryt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();
  
      return res.json({ status: true, message: "User created" });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  });

// login

router.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.json({status:false ,message: "User not found"})
    }
    const validPassword = await bcryt.compare(password, user.password)
    if(!validPassword){
        return res.json({status:false ,message: "Invalid credentials"})
    }   
    const token = jwt.sign({username:user.username}, process.env.KEY,{expiresIn:"1d"})
    res.cookie('token',token,{httpOnly:true, expiresIn:"1d"})
    return res.json({status:true, message:"login successful"})
})  



//forgotpassword
router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    console.log(email)
    
    try {
       
        const user = await User.findOne({ email });
        console.log(user)
        
        if (!user) {
        
            return res.status(404).json({ message: 'User not found' });
        }
        
        
        res.status(200).json({ message: 'User exists' });
        console.log("user exist")
        
    } catch (error) {
        
        console.error('Error checking user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


  
  // emailVerfy for otp emaile send and store the otp in  to data base 
  router.post("/emailVerfy", async (req, res) => {
    const {email} = req.body;
    console.log(transporter)
  
    try {
      // Generate OTP
      const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
      console.log(email)
      console.log(otp)
      const expiration = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  
      // Save OTP to database
      const otpDoc = new OTP({ email, otp, expiration });
      await otpDoc.save();
      console.log(otpDoc)
  
      // Send OTP via email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ status: false, message: 'Error sending OTP' });
        }
        res.status(200).json({ status: true, message: 'OTP sent to email' });
      });
    } catch (error) {
      console.error('Error processing signup:', error);
      res.status(500).json({ status: false, message: 'Internal server error' });
    }
  });


  
  
  //  verify OTP
  router.post('/vreifyOtp', async (req, res) => {
    const { email, otp } = req.body;
    console.log('Received OTP verification request:', req.body);
  
    if (!email || !otp) {
      return res.status(400).json({ status: false, message: 'Email and OTP are required' });
    }
  
    try {
      const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
      console.log(otpRecord)
  
      if (!otpRecord) {
        return res.status(400).json({ status: false, message: 'Invalid or expired OTP' });
      }
  
      const isOtpValid = otpRecord.otp === otp;
      const isOtpExpired = moment().isAfter(moment(otpRecord.createdAt).add(10, 'minutes'));
  
      if (isOtpValid && !isOtpExpired) {
        return res.status(200).json({ status: true, message: 'OTP verified successfully' });
      } else {
        return res.status(400).json({ status: false, message: 'Invalid or expired OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ status: false, message: 'Error verifying OTP' });
    }
  });


  // resetpassword
  

  router.post('/resetpassword', async (req, res) => {
    const { email, password } = req.body; // Extract email and password
  
    if (!email || !password) {
      return res.status(400).json({ status: false, message: 'Invalid request' });
    }
  
    try {
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
  
      
      const hashedPassword = await bcryt.hash(password, 10);
  
   
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ status: true, message: 'Password reset successful' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ status: false, message: 'Internal server error' });
    }
  });
   

export {router as userRouter}