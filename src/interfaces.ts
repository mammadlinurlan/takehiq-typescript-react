export interface ProductIF{
    image : String,
    price : number,
    name : String,
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
    basket : [],
    orders : []

}