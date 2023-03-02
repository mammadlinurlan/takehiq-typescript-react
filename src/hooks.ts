import { useContext,createContext } from "react";
import { IOrder, ProductIF,IUser} from "./interfaces";
export const ProductContext = createContext<any>([])
export const useProductContext = () => useContext<ProductIF>(ProductContext)
export const UserContext = createContext({
    user : {} as IUser,
    setUser : (user : IUser) => {}
})
export const useUserContext = () => useContext(UserContext)



export const BasketContext = createContext<any>([])
export const OrderContext = createContext({
    orders : [] as IOrder[],
    setOrders : (orders : IOrder[]) => {}
})

// export const userBasketContext = () => useContext<IBasketItem>(ProductContext)
