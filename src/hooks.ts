import { useContext,createContext } from "react";
import { IProducts, ProductIF,IUser } from "./interfaces";
export const ProductContext = createContext<any>([])
export const useProductContext = () => useContext<ProductIF>(ProductContext)

// export const UserContext = createContext<any>({} as IUser)
export const UserContext = createContext({
    user : {} as IUser,
    setUser : (user : IUser) => {}
})
export const useUserContext = () => useContext(UserContext)