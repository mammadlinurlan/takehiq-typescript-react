export interface ProductIF{
    image : string,
    price : number,
    name : string,
    stock : number,
    _id : string
}

export interface IProductReq{
    image : string,
    price : number,
    name : string,
    stock : number
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
    _id : string,
    username : string,
    email : string,
    isadmin : boolean,
    basket : IBasketItem[],
    orders : IOrder[]

}

export interface ISlider{
    _id : string,
    name : string,
    image : string
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
    _id : string,
    userId : string
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
    orderItems : IBasketItem[],
    date : Date

}

export interface IMakeOrder {
    userId : string
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
    orderItems : IBasketItem[],
    date : Date

}

export interface IOrders {
    orders : IOrder[]
}
