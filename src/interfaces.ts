export interface ProductIF{
    image : string,
    price : number,
    name : string,
    stock : number,
    _id : string
}


export interface IProducts{
    productsArray : ProductIF[]
}

export interface IRegister{
    username : string,
    password : string,
    confirmpassword : string,
    isadmin : boolean,
    email : string
}

export interface ILoginForm{
    username : string,
    password : string
}

export interface IUser{
    id : string,
    username : string,
    email : string,
    isadmin : boolean,
    basket : IBasketItem[],
    orders : []

}

export interface IBasketItem{
    _id : string,
    count : number,
    name : string,
    userId : string,
    price : number,
    image : string

}

export interface IBasket{
    basketArray : IBasketItem[]
}

export interface IOrder {
    name : string,
    surname : string ,
    country : string,
    state : string,
    city : string,
    zip : string,
    phone : string,
    status : number,
    address : string,
    totalPrice : number,
    orderItems : IBasketItem[]

}
