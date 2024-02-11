import express from "express";
import AppDataSource from "../dataSources";
import { User } from "../Entities/user";
import { Stocks } from "../Entities/stocks";
import { Prices } from "../Entities/prices";
import { And, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const router = express.Router();

router.post('/', async (req,res)=>{
  const {ticker,price:bodyPrice,email} = req.body
  if(email && typeof ticker === "string")
  {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({where:{
      email
    }})
    if(user)
    {
      if(ticker && typeof ticker === "string")
      {
        const stocksRepo = AppDataSource.getRepository(Stocks);
        const stock = await stocksRepo.findOne({where: {
          ticker
        }})
        if(stock)
        {
          const pricesRepo = AppDataSource.getRepository(Prices);
          const price = new Prices();
          price.price = bodyPrice;
          price.stock = stock;
          price.user = user;

          const priceInserted = await pricesRepo.save(price);
          if(priceInserted){
            return res.status(200).json({status:'success', msg:'Prices saved successfully!'})
          }
          return res.status(400).json({status:'error', msg:'Prices cannot be saved at this moment. Please try again later!'})
        }
        return res.status(404).json({status:'error', msg:'Stock you are trying to save is not found!'})
      }
      return res.status(400).json({status:'error', msg:'Stock you are trying to save is not valid!'})
    }
    return res.status(404).json({status:'error', msg:'User not found!'})
  }
  return res.status(400).json({status:'error', msg:'Invalid Request'})
})

router.get('/', async (req,res)=>{
  const {email,start:startDate,end:endDate} = req.query;
  if(email && typeof email === 'string'){
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({where:{email}})
    if(user){
      const pricesRepo = AppDataSource.getRepository(Prices);
      if(startDate && typeof startDate === 'string')
      {
        const start = new Date(startDate)
        if(endDate && typeof endDate === 'string')
        {
          const end = new Date(endDate)
          const data = await pricesRepo.find({where:{
            created: And(MoreThanOrEqual(start), LessThanOrEqual(end)),
            user
          },
          order: {
            id: 'ASC',
            stock: {
              name: 'DESC'
            }
          }
        })
          return res.status(200).json({status:'success', msg:'Data successfully fetched', data})
        }
        const data = await pricesRepo.find({where:{
            created: MoreThanOrEqual(start),
            user
          },
          order: {
            id: 'ASC',
            stock: {
              name: 'DESC'
            }
          }
        })
        return res.status(200).json({status:'success', msg:'Data successfully fetched',data})
      }
      if(endDate && typeof endDate === 'string')
      {
        const end = new Date(endDate)
        const data = await pricesRepo.find({where:{
            created: LessThanOrEqual(end),
            user
          },
          order: {
            id: 'ASC',
            stock: {
              name: 'DESC'
            }
          }
        })
        return res.status(200).json({status:'success', msg:'Data successfully fetched', data})
      }
      const data = await pricesRepo.find({where:{
          user
        },
        order: {
          id: 'ASC',
          stock: {
            name: 'DESC'
          }
        }
      })
      return res.status(200).json({status:'success', msg:'Data successfully fetched', data})
    }
    return res.status(404).json({status:'error', msg:'User not found'})
  }
  return res.status(400).json({status:'error', msg:'Invalid request'})
})

export default router