import { useContext,createContext } from "react";
import { IProducts, ProductIF,IUser,IBasket,IBasketItem } from "./interfaces";
export const ProductContext = createContext<any>([])
export const useProductContext = () => useContext<ProductIF>(ProductContext)
export const UserContext = createContext({
    user : {} as IUser,
    setUser : (user : IUser) => {}
})
export const useUserContext = () => useContext(UserContext)



export const BasketContext = createContext<any>([])
// export const userBasketContext = () => useContext<IBasketItem>(ProductContext)
