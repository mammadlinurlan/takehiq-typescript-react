import React from "react";
import { ProductIF } from "../../interfaces";
import './product.css'
import { Link } from "react-router-dom";
export const Product : React.FC<ProductIF> = (props : ProductIF) => {
    const p = {} as ProductIF
    return(
       
         <div className="product col-lg-3 col-md-6 col-12">
            <div className="imageDiv">
                <img src={`http://localhost:3000/${props.image}`}/>
            </div>
            <div className="productInfo">
                <p className="productName">{props.name}</p>
                <p className="productPrice">{props.price} AZN</p>
            </div>
            <div className="addToCart">
                <Link to='google.com'>ADD TO CART</Link>
            </div>
        </div>
    ) 
}