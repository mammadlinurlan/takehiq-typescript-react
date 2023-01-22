import React, { useContext } from "react";
import { ProductIF } from "../../interfaces";
import { Product } from "./Product";
import './products.css'
import { ProductContext } from "../../hooks";
interface ProductsIF {
    products: ProductIF[]
}
export const Products: React.FC<ProductsIF> = ({ products }: ProductsIF) => {
    return (
        <section id="products" className="container">
            <div className="products">
                {
                    products.map((p,index) => {
                        return (
                            <Product key={index} _id={p._id} image={p.image} name={p.name} stock={p.stock} price={p.price} />
                        )
                    })
                }
            </div>
        </section>
    )
}