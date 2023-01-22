import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ProductIF } from '../../interfaces';
import { Product } from './Product';
import './owl.css'
import './BestSellers.css'
interface IBestSellers {
    bestSellers: ProductIF[]
}
export const BestSellers: React.FC<IBestSellers> = ({ bestSellers }: IBestSellers) => {
    return (
        <section id='bestsellers'>
            <div className='container'>
                <h1>Best Sellers</h1>
                <OwlCarousel className='owl-theme' autoWidth={true} autoplay={true} >
                    {bestSellers.map((p) => {
                        return (
                            <Product key={p._id} _id={p._id} image={p.image} price={p.price} name={p.name} stock={p.stock} />
                        )
                    })}
                </OwlCarousel>
            </div>
        </section>
    )
}
