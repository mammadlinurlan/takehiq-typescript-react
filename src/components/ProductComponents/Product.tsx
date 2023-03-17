import React, { useContext } from "react";
import { ProductIF, IBasketItem} from "../../interfaces";
import './product.css'
import { BasketContext } from "../../hooks";
import axios from "axios";
import { Link, Navigate ,redirect} from "react-router-dom";
import Swal from "sweetalert2";
export const Product: React.FC<ProductIF> = (props: ProductIF) => {
    const p = {} as ProductIF
    const basketContext = useContext(BasketContext)
    return (

        <div className="product col-lg-3 col-md-6 col-12">
            <div className="imageDiv">
                <img src={`https://morning-peak-77048.herokuapp.com/${props.image}`} />
            </div>
            <div className="productInfo">
                <p className="productName">{props.name}</p>
                <p className="productPrice">{props.price} AZN</p>
            </div>
            <div className="addToCart">
                <Link
                    onClick={(e) => {
                        e.preventDefault()
                            console.log('salam')
                            const basketItem = {} as IBasketItem
                            basketItem._id = props._id
                            basketItem.count = 1
                            basketItem.image = props.image
                            basketItem.name = props.name
                            basketItem.price = props.price
                            basketItem.userId = localStorage.getItem('userId') || ''
                            axios.post('https://morning-peak-77048.herokuapp.com/addtobasket', basketItem)
                                .then((res) => {
                                    console.log(res)
                                    basketContext.setBasket(res.data as IBasketItem[])
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Successfully added!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                })
                                .catch((err) => {
                                    window.location.href = `http://${window.location.host}/login`
                                   
                                })
                    }}
                    to='/'>ADD TO CART</Link>
            </div>
        </div>
    )
}