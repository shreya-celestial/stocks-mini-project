import { Request, Response } from "express";
import { User } from "../../Entities/user";
import AppDataSource from "../../dataSources";

export const signup = async (req:any,res:any)=> {
  const {fname,lname,email,password,pin,country,state,city,address1,address2} = req.body
  const userRepo = AppDataSource.getRepository(User)
  const check = await userRepo.findOne({where:{
    email
  }})

  if(!check){
    const user = new User();
    user.firstname = fname;
    user.lastname = lname;
    user.email = email;
    user.password = password;
    user.pincode = pin;
    user.country = country;
    user.state = state;
    user.city = city;
    user.address2 = address2;
    user.adress1 = address1;

    const userInserted = await userRepo.save(user)
    return res.status(200).json({ msg:'User signed up successfully!', status:'success', data:userInserted})
  }
  return res.status(400).json({ msg:'Email already exists!', status:'error'})
}

export const login = async (req:any,res:any) => {
  const {email,password} = req.query
  const userRepo = AppDataSource.getRepository(User)
  const checkedUser = await userRepo.findOne({where:{
    email,password
  }})
  if(checkedUser)
  {
    return res.status(200).json({status:'success', msg: 'User logged in successfully', data:checkedUser})
  }
  return res.status(400).json({ msg:'Authentication failed.. Please try again!', status:'error'})
}

export const gdata = async (req:any, res:any) => {
  const token = req?.headers?.cookies;
  if(token && token!=='logged out')
  {
    const userRepo = AppDataSource.getRepository(User)
    const checkedUser = await userRepo.findOne({where:{
      token
    }})
    return res.status(200).json({status:'success', msg: 'User logged in successfully', data:checkedUser})
  }
  return res.status(400).json({ msg:'Authentication failed.. Please try again!', status:'error'})
}

export const glogout = async (req:any,res:any) => {
  const {id} = req.params;
  if(id)
  {
    const userRepo = AppDataSource.getRepository(User)
    const updated = await userRepo.update(id, {
      token: 'logged out'
    })
    return res.status(200).json({status:'success', msg:'successfully logged out!'})
  }
  return res.status(404).json({status:'error', msg:'User not found!'})
}

export const checkUser = async (req: Request, res: Response)=>{
  const {id,firstname,lastname,email,password,pincode,country,state,city,adress1,address2,pictureUrl,authId,token} = req.body;
  const userRepo = AppDataSource.getRepository(User)
  const check = await userRepo.findOne({where:{
    id, 
    firstname,
    lastname,
    email,
    password,
    pincode,
    country,
    state,
    city,
    adress1,
    address2,
    pictureUrl,
    authId,
    token
  }})
  if(check)
  {
    return res.status(200).json({status:'success',msg:'User logged in!'})
  }
  if(id && email && token)
  {
    const updated = await userRepo.update({id, email}, {
      token: 'logged out'
    })
  }
  return res.status(404).json({status:'error',msg:'User not found!'})
}

export const resetPassword = async (req: Request,res: Response) => {
  const {password, email} = req.body;
  const userRepo = AppDataSource.getRepository(User)
  const updated = await userRepo.update({email}, {
    password
  })
  if(updated){
    return res.status(200).json({status: 'success', msg: 'Password changed successfully!'})
  }
  return res.status(400).json({status: 'error', msg: 'Something went wrong. Please try again later'})
}

export const addDevice = async (req: Request,res: Response) => {
  const {email,deviceToken} = req.body;
  if(email && deviceToken)
  {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.update({email}, {
      deviceToken
    })
    if(user){
      return res.status(200).json({status:'success', msg:"device updated successfully", data: user})
    }
    return res.status(400).json({status:'error', msg:"Cannot update device at this moment."})
  }
  return res.status(400).json({status:'error', msg:"Please provide with valid data"})
}