import "reflect-metadata"
import express from "express";
import nocache from "nocache";
import cors from "cors";
import { getJson } from "serpapi";
import AppDataSource from './dataSources';
import signup from './Routes/signup'

const app = express();

app.use(nocache());
app.use(express.json());
app.use(cors())
app.use('/user',signup)

app.get('/market', async (req, res)=>{
  const { stock } = req.query
  try{
    const gbodyFinance = {
      engine: "google_finance",
      q:stock,
      api_key: "3186911e9d229ec7706b45b0a23f81c2d0e916de8f5e8728948d6627ae793d68",
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

