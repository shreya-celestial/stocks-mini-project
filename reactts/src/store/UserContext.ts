import { createContext } from "react";

interface userContextType {
  user: any;
  setUser: (data: any) => void;
}

const userType = {
  user: null,
  setUser: (data:any)=>{}
}

const UserContext = createContext<userContextType>(userType)

export default UserContext