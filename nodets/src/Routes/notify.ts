//  $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\shreya.garg\Desktop\All\Assigned Projects\Git Repos\Stocks react node ts app\nodets\nstockse-firebase-adminsdk-pg15l-6b4b24e2e8.json"

import express, { Request, Response } from "express";
import AppDataSource from "../dataSources";
import { User } from "../Entities/user";
import { Notifications } from "../Entities/notifications";
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging'
import { Not } from "typeorm";

const router = express.Router();
const app = initializeApp({
  credential: applicationDefault(),
});

router.post('/', async (req, res)=>{
  const {email,message} = req.body
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({where:{email}})
  if(user)
  {
    const notification = new Notifications();
    notification.message = message;
    notification.user = user;

    const notiRepo = AppDataSource.getRepository(Notifications);
    const notiInserted = await notiRepo.save(notification)
    if(notiInserted)
    {
      const allUsers = await userRepo.find({
        select:{
          deviceToken: true
        }
      });
      const deviceTokens = allUsers.map((item)=>item.deviceToken)
      const fbMessage = {
        notification: {title:user?.email, body:message},
        tokens: deviceTokens,
      };
      const msgs = await getMessaging().sendMulticast(fbMessage)
      if(msgs.successCount)
      {
        return res.status(200).json({status:'success', msg:'Notification sent!'})
      }
      return res.status(400).json({status:'error', msg:'Notification cannot be sent at the moment'})
    }
    return res.status(400).json({status:'error', msg:'Something went wrong, Please try again!'})
  }
  return res.status(404).json({status:'error', msg:'User not found!'})
})

router.get('/', async (req,res)=>{
  const {email} = req.query;
  if(email && typeof email === "string") 
  {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({where:{
      email
    }})
    
    if(user)
    {
      const notiRepo = AppDataSource.getRepository(Notifications);
      const notifications = await notiRepo.find({
        where:{
          user: {
            id: Not(user.id)
          }
        },
        order:{
          id: 'DESC'
        }
      })
      if(notifications)
      {
        return res.status(200).json({status:'success', msg:'Notifications received', data:notifications})
      }
      return res.status(400).json({status:'error', msg:'Cannot get notifications at the moment'})
    }
    return res.status(400).json({status:'error', msg:'Invalid user!'})
  }
  return res.status(400).json({status:'error', msg:'Invalid request'})
})

export default router;