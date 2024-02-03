import express from "express";
import nocache from "nocache";
import cors from "cors";
import { getJson } from "serpapi";
const app = express();

app.use(nocache());
app.use(express.json());
app.use(cors())

app.get('/market', async (req, res)=>{
  const { stock } = req.query
  try{
    const gbodyFinance = {
      engine: "google_finance",
      q:stock,
      api_key: "dc6ed80439d2013d9e0963477ab1654c7bb8578d5927d86a6f178f06f4892063",
    }
    const gresFin = await getJson(gbodyFinance);
    return res.status(200).json(gresFin)
  }
  catch(err)
  {
    return res.status(400).json({error:err})
  }
})

app.listen(8080,()=>{
  console.log('Listening on http://localhost:8080/')
})