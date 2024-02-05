import { User } from "../../Entities/user";
import AppDataSource from "../../dataSources";

export const signup = async (req:any,res:any)=> {
  const {name,email,password,pin,country,state,city,address1,address2} = req.body
  const userRepo = AppDataSource.getRepository(User)
  const check = await userRepo.findOne({where:{
    email
  }})

  if(!check){
    const user = new User();
    user.firstname = name.split(' ')[0];
    user.lastname = name.split(' ')[1] ? name.split(' ')[1] : '';
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