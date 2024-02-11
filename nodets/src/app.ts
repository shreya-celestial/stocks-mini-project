import "reflect-metadata"
import express from "express";
import nocache from "nocache";
import cors from "cors";
import { getJson } from "serpapi";
import AppDataSource from './dataSources';
import signup from './Routes/signup'
import oauth from './Routes/googleOauth'
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import mail from './Routes/mail'
import prices from './Routes/prices'
import stocks from './Routes/stocksData'
dotenv.config();

const app = express();

app.use(nocache());
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use('/user',signup)
app.use('/oauth', oauth)
app.use('/mail',mail)
app.use('/stocks', stocks)
app.use('/prices', prices)

app.get('/market', async (req, res)=>{
  const { stock } = req.query
  try{
    const gbodyFinance = {
      engine: "google_finance",
      q:stock,
      api_key: process.env.GOOGLE_API_KEY,
    }
    const gresFin = await getJson(gbodyFinance);
    return res.status(200).json(gresFin)
  }
  catch(err)
  {
    return res.status(400).json({error:err})
  }
})

AppDataSource.initialize().then(()=>{
  console.log('db connected!')
  app.listen(8080,()=>{
    console.log('Listening on http://localhost:8080/')
  })
}).catch((err)=>{
  console.log(err)
})

