import React, { useEffect } from "react";
import axios from "axios";
import { Products } from "../ProductComponents/Products";
import { Slider } from "../Slider/Slider";
import { ProductContext } from "../../hooks";
import { ProductIF } from "../../interfaces";
import { IProducts } from "../../interfaces";
import { BestSellers } from "../ProductComponents/BestSellers";
import { Banner } from "./Banner";
export const Index : React.FC<IProducts> = ({productsArray} : IProducts)  => {    
    return (
        <div className="wrapper">
                <Slider />
                <BestSellers bestSellers={productsArray} />
                <Banner/>
                <Products products={productsArray} />
        </div>
    )
}