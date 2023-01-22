import React, { useEffect, useState } from "react";
import './Navbar.css'
import { faShoppingBag, faBars, faArrowCircleUp, faTrash, faArrowUp, faSearch, faWindowClose, faArrowDown, faUser, faShoppingCart, faUserAlt } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link, useLocation } from "react-router-dom";
export const Navbar = () => {
    let { pathname } = useLocation()
    const [src, setSrc] = useState('/hiqLogo.webp')
    const [textColor, setTextColor] = useState('white')
    const [position,setPosition] = useState('absolute')
    
    useEffect(() => {
        if (pathname !== '/') {
            setSrc('/heh.webp')
            setTextColor('black')
            setPosition('relative')
            document.querySelector('#header')?.classList.add('borderClass')
        }
        else {
            setSrc('/hiqLogo.webp')
            setTextColor('white')
            setPosition('absolute')
            document.querySelector('#header')?.classList.remove('borderClass')

        }
    }, [pathname])
    return (

        <header style={{position: position}as React.CSSProperties} id="header">
            <nav className="container">
                <div className="row">
                    <div className="logo col-lg-3 col-md-3 col-6">
                        <Link to='/'>
                            <img className="forChangeLogo" src={src} />
                        </Link>
                    </div>
                    <div className="services col-lg-6 col-md-6 col-0">
                        <Link style={{ color: textColor }} to='' >Products <FontAwesomeIcon style={{ color: textColor }} icon={faArrowDown as IconProp} /> </Link>
                        <Link style={{ color: textColor }} to='' >Sales</Link>
                        <Link style={{ color: textColor }} to=''>About Us</Link>
                    </div>
                    <div className="customerServices col-lg-3 col-md-3 col-6">
                        <Link style={{ color: textColor }} to='/login'><FontAwesomeIcon style={{ color: textColor }} icon={faUserAlt as IconProp} /></Link>
                        <FontAwesomeIcon

                            onClick={() => {
                                document.querySelector('.mobileNav')?.classList.add('activeMobNav')
                            }}
                            style={{ display: "none", color: textColor }} icon={faBars as IconProp} />
                        <FontAwesomeIcon style={{ color: textColor }} icon={faSearch as IconProp} />
                        <FontAwesomeIcon style={{ color: textColor }} icon={faShoppingCart as IconProp} />
                    </div>
                </div>
            </nav>
            <div className="afterScrollNavWrapper">
                <nav className="container afterScrollNav">
                    <div className="row">
                        <div className="logo col-lg-3 col-md-3 col-6">
                            <Link className="mediumLogo" to='/'>
                                <img src='/heh.webp' />
                            </Link>
                            <Link className="phoneLogo" to='/'>
                                <img src='https://cdn.shopify.com/s/files/1/0579/3795/2829/files/hiq-black_140x@2x.png?v=1662707879' />
                            </Link>
                        </div>
                        <div className="services col-lg-6 col-md-6 col-0">
                            <Link style={{ color: "black" }} to='' >Products <FontAwesomeIcon icon={faArrowDown as IconProp} /> </Link>
                            <Link style={{ color: "black" }} to='' >Sales</Link>
                            <Link style={{ color: "black" }} to=''>About Us</Link>
                        </div>
                        <div className="customerServices col-lg-3 col-md-3 col-6">
                            <Link to='/login'><FontAwesomeIcon style={{ color: "black" }} icon={faUserAlt as IconProp} /></Link>
                            <FontAwesomeIcon onClick={() => {
                                document.querySelector('.mobileNav')?.classList.add('activeMobNav')
                            }} style={{ color: "black", display: "none" }} icon={faBars as IconProp} />

                            <FontAwesomeIcon style={{ color: "black" }} icon={faSearch as IconProp} />
                            <FontAwesomeIcon style={{ color: "black" }} icon={faShoppingCart as IconProp} />
                        </div>
                    </div>
                </nav>
            </div>
            <div className="mobileNavbarWrapper">
                <nav className="mobileNav">
                    <div className="mobileLinks container">
                        <div className="iconClose">
                            <FontAwesomeIcon
                                onClick={() => {
                                    document.querySelector('.mobileNav')?.classList.remove('activeMobNav')
                                }}
                                icon={faWindowClose as IconProp} />
                        </div>
                        <ul>
                            <li>
                                <Link
                                    onClick={() => {
                                        document.querySelector('.mobileNav')?.classList.remove('activeMobNav')
                                    }}
                                    to=''>Products</Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => {
                                        document.querySelector('.mobileNav')?.classList.remove('activeMobNav')
                                    }}
                                    to=''>Sales</Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => {
                                        document.querySelector('.mobileNav')?.classList.remove('activeMobNav')
                                    }}
                                    to=''>About Us</Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => {
                                        document.querySelector('.mobileNav')?.classList.remove('activeMobNav')
                                    }}
                                    to='login'>Account</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}