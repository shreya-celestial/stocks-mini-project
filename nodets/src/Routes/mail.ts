import express from "express";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import dotenv from "dotenv"
import { getOtp } from "./Controllers/globalUtils";
import AppDataSource from "../dataSources";
import { User } from "../Entities/user";
import { UserOtp } from "../Entities/userotps";
dotenv.config()

const router = express.Router();
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api', 
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' 
});

router.get('/',async (req,res)=>{
  const {email} = req.query;
  if(email && typeof email === 'string'){
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({where:{
      email
    }})
    if(user)
    {
      const otpRepo = AppDataSource.getRepository(UserOtp);
      const otp = getOtp();
      const userOtp = new UserOtp();
      userOtp.otp = otp;
      userOtp.user = user;

      const mail = await mg.messages.create('sandbox25831f98c4e440e8b22b5b1260291735.mailgun.org', {
        from: "NStocksE <postmaster@sandbox25831f98c4e440e8b22b5b1260291735.mailgun.org>",
        to: [email],
        subject: "OTP for NStocksE Password Reset",
        text: ``,
        html: `<div>
          <p>Hi! User,</p>
          <p>Your One Time Password (OTP) for resetting your account password is:</p>
          <h3 style="text-align:center">${otp}</h3>
          <p>Thanks!</p>
          <br />
          <div>
            <p>In your service,</p>
            <p>NStocksE Team</p>
          </div>
        </div>`
      })
      if(mail.status === 200){
        const otpInserted = await otpRepo.save(userOtp)
        return res.status(200).json({status: 'success', msg:'OTP sent!', otp, email})
      }
      return res.status(400).json({status: 'error', msg:'Mail cannot be sent at this moment'})

    }
    return res.status(404).json({status: 'error', msg:'Email not found!'})
  }
  return res.json({msg:"Enter a valid email"})
})

router.get('/verifyOtp', async (req,res)=>{
  const {email, otp} = req.query
  if(email && typeof email === 'string'){
    const otpRepo = AppDataSource.getRepository(UserOtp);
    const userOtp = await otpRepo.findOne({
      where:{
        user: {email}
      },
      order: {
        id: "DESC"
      }
    })
    if(userOtp){
      if(otp && +otp === userOtp?.otp)
        return res.status(200).json({status:'success', msg:"OTP verified!"})
      else
        return res.status(400).json({status:'error', msg: 'Invalid otp'})
    }
    return res.status(404).json({status:'error', msg:'Record requested not found'})
  }
  res.status(400).json({status: 'error', msg:"Invalid email"})
})

export default router;