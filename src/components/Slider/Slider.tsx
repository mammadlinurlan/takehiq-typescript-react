import React, { useState } from 'react';
import './Slider.css'
import Carousel from 'react-bootstrap/Carousel';
import { ISlider } from "../../interfaces";
interface ISliders {
    sliders : ISlider[]
}

export const Slider : React.FC<ISliders> = ({sliders} : ISliders) => {

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    }
    return (

        <section id='slider'>
            <Carousel variant='dark' activeIndex={index} onSelect={handleSelect} draggable={true} >
                {sliders.map((s)=>{
                    return(
                        <Carousel.Item style={{ height: '95vh' }}>
                        <img
                            style={{ objectFit: 'cover', height: '95vh' }}
                            className="d-block w-100"
                            src={s.image}
                            alt={s.name}
                        />
    
                    </Carousel.Item>
                    )
                })}
               
            </Carousel>
        </section>

    )
}

