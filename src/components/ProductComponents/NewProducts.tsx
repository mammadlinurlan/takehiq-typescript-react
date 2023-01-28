import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ProductIF } from '../../interfaces';
import { Product } from './Product';
import './owl.css'
import './BestSellers.css'
interface INewProducts {
    newProducts: ProductIF[]
}
export const NewProducts: React.FC<INewProducts> = ({ newProducts }: INewProducts) => {
    return (
        <section id='bestsellers'>
            <div className='container'>
                <h1>New Products</h1>
                <OwlCarousel className='owl-theme' autoWidth={true} autoplay={true} >
                    {newProducts.slice(0,5).map((p) => {
                        return (
                            <Product key={p._id} _id={p._id} image={p.image} price={p.price} name={p.name} stock={p.stock} />
                        )
                    })}
                </OwlCarousel>
            </div>
        </section>
    )
}
