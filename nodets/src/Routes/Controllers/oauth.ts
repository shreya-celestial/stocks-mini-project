import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { gdataInTable } from "./globalUtils";

dotenv.config();

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email openid ', 
  'https://www.googleapis.com/auth/userinfo.profile openid ',
]

export const clientRequest = (req:any,res:any) => {
  const redirectUrl = 'http://localhost:8080/oauth';

  const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET,redirectUrl)
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  });

  res.json({url:authorizeUrl})
}

const getUserData = async (access_token:string | null | undefined) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  return data;
}

export const googleRequest = async (req:any,res:any) => {
  const code = req.query.code;
   try {
      const redirectURL = "http://localhost:8080/oauth"
      const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
      );
      const token =  await oAuth2Client.getToken(code);
      await oAuth2Client.setCredentials(token.tokens);
      const user = oAuth2Client.credentials;
      const data = await getUserData(oAuth2Client.credentials.access_token);
      data["token"] = user?.id_token
      gdataInTable(data)
      
      return res.cookie('token', user?.id_token).redirect(303, 'http://localhost:3000/login/user');
    } catch (err) {
      console.log('Error logging in with OAuth2 user', err);
    }
    res.clearCookie('token').redirect(303, 'http://localhost:3000/login/user');
}