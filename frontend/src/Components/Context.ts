import { createContext } from "react";
import { User } from './Users/ManagerProfile';

export const UserContext = createContext<{user:User|null, setUser: (user: User|null)=>void}>({user:null, setUser:()=>{}});