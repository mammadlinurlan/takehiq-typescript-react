import React, { useEffect } from "react";
import axios from "axios";
import { Products } from "../ProductComponents/Products";
import { Slider } from "../Slider/Slider";
import { ProductContext } from "../../hooks";
import { ProductIF } from "../../interfaces";
import { IProducts } from "../../interfaces";
import { BestSellers } from "../ProductComponents/BestSellers";
import { Banner } from "./Banner";
import { NewProducts } from "../ProductComponents/NewProducts";
import { BottomBanner } from "./BottomBanner";
import { ISlider } from "../../interfaces";

export const Index: React.FC<IProducts> = ({ productsArray }: IProducts) => {
    const [sliders, setSliders] = React.useState([] as ISlider[])
    useEffect(() => {
        axios.get(`https://morning-peak-77048.herokuapp.com/sliders`)
            .then((res) => {
                setSliders(res.data)
            })
    }, [])
    return (
        <div className="wrapper">
            <Slider sliders={sliders} />
            <BestSellers bestSellers={productsArray} />
            <Banner />
            <NewProducts newProducts={productsArray} />
            <BottomBanner />
            {/* <Products products={productsArray} /> */}

        </div>
    )
}