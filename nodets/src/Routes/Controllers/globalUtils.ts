import { User } from "../../Entities/user";
import AppDataSource from "../../dataSources";

export const gdataInTable = async (data:any) => {
  const userRepo = AppDataSource.getRepository(User)
  const check = await userRepo.findOne({where:{
    authId: data.sub
  }})

  if(check)
  {
    const updated = await userRepo.update(check.id, {
      token: data.token
    })
    return;
  }
  const user = new User();
  user.firstname = data?.given_name;
  user.lastname = data?.family_name;
  user.email = data?.email;
  user.pictureUrl = data?.picture;
  user.authId = data?.sub;
  user.token = data?.token

  const userInserted = await userRepo.save(user)
  return
}


export const getOtp = () => {
  const otp = Math.floor(+(Math.random()).toFixed(4) * 10000);
  if(otp > 999)
    return otp
  if(otp>0)
    return 10000-otp
  return  4378
}