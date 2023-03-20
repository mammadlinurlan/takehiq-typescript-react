import React, { useState } from 'react';
import './Slider.css'
import Carousel from 'react-bootstrap/Carousel';


export const Slider = () => {

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);

    }
    return (

        <section id='slider'>
            <Carousel variant='dark' activeIndex={index} onSelect={handleSelect} draggable={true} >
                <Carousel.Item style={{ height: '95vh' }}>
                    <img
                        style={{ objectFit: 'cover', height: '95vh' }}
                        className="d-block w-100"
                        src="https://cdn.shopify.com/s/files/1/0579/3795/2829/files/SLIDER-BANNER-HIPRO.jpg?v=1670337289&width=1920"
                        alt="First slide"
                    />

                </Carousel.Item>
                <Carousel.Item style={{ height: '95vh' }}>
                    <img
                        style={{ objectFit: 'cover', height: '95vh' }}
                        className="d-block w-100"
                        src="https://cdn.shopify.com/s/files/1/0579/3795/2829/files/SLIDER-BANNER-FRESHWHEY.jpg?v=1673081100&width=1920"
                        alt="Second slide"
                    />


                </Carousel.Item>
                <Carousel.Item style={{ height: '95vh' }}>
                    <img
                        style={{ objectFit: 'cover', height: '95vh' }}
                        className="d-block w-100"
                        src="https://cdn.shopify.com/s/files/1/0579/3795/2829/files/SLIDER-BANNER-MULTIVITAMIN.jpg?v=1673081186&width=1920"
                        alt="Third slide"
                    />


                </Carousel.Item>

                <Carousel.Item style={{ height: '95vh' }}>
                    <img
                        style={{ objectFit: 'cover', height: '95vh' }}
                        className="d-block w-100"
                        src='
https://cdn.shopify.com/s/files/1/0579/3795/2829/files/SLIDER-BANNER-ISOLATE-2_601a98e3-0156-41eb-a86a-0715fce4ffc6.jpg?v=1678914214&width=1920
'
                        alt="Third slide"
                    />


                </Carousel.Item>
            
            </Carousel>
        </section>

    )
}

