import React, { useContext, useEffect, useState, useRef } from "react";
import './Navbar.scss'
import { faShoppingBag, faBars, faArrowCircleUp, faTrash, faArrowUp, faClosedCaptioning, faSearch, faWindowClose, faArrowDown, faUser, faShoppingCart, faUserAlt } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoCloseOutline, IoBasket } from 'react-icons/io5'
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link, useLocation } from "react-router-dom";
import { UserContext, BasketContext } from "../../hooks";
import axios from "axios";
import { IBasket, IBasketItem, ProductIF } from "../../interfaces";
import Swal from "sweetalert2";
export const Navbar = () => {
    let { pathname } = useLocation()
    const [src, setSrc] = useState('/hiqLogo.webp')
    const [inputVal,setInputVal] = useState('')
    const [textColor, setTextColor] = useState('white')
    const [position, setPosition] = useState('absolute')
    const [total, setTotal] = useState(0)
    const [searchProducts, setSearchProducts] = useState([] as ProductIF[])
    const [noResult, setNoResult] = useState(false)
    const userContext = useContext(UserContext)
    const basketContext = useContext(BasketContext)
    const Basket = basketContext.basket as IBasketItem[]
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
        document.querySelector('.basketarea')?.classList.remove('activeBasket')
        document.querySelector('.searchWrapper')?.classList.remove('activeSearch')

    }, [pathname])
    useEffect(() => {
        Basket ? setTotal(
            Basket.reduce((total, item) => {
                return total += item.price * item.count
            }, 0)
        )
            :
            console.log('log in')
    }, [Basket])

    return (

        <header style={{ position: position } as React.CSSProperties} id="header">
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
                        <FontAwesomeIcon
                            onClick={() => {
                                document.querySelector('.searchWrapper')?.classList.add('activeSearch')
                            }}
                            style={{ color: textColor }} icon={faSearch as IconProp} />
                        <FontAwesomeIcon
                            onClick={() => {
                                document.querySelector('.basketarea')?.classList.add('activeBasket')
                            }}
                            style={{ color: textColor }} icon={faShoppingCart as IconProp} />
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

                            <FontAwesomeIcon
                              onClick={() => {
                                document.querySelector('.searchWrapper')?.classList.add('activeSearch')
                            }}
                            style={{ color: "black" }} icon={faSearch as IconProp} />
                            <FontAwesomeIcon
                                onClick={() => {
                                    document.querySelector('.basketarea')?.classList.add('activeBasket')
                                }}
                                style={{ color: "black" }} icon={faShoppingCart as IconProp} />
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
            <div className="basketarea container">
                <div style={{ justifyContent: 'space-between', padding: '14px 0px' }} className="col-lg-12 d-flex">
                    <h3 style={{ fontWeight: '700', margin: '0' }}>Cart</h3>
                    <IoCloseOutline
                        fontSize='28px'
                        onClick={() => {
                            document.querySelector('.basketarea')?.classList.remove('activeBasket')
                        }}
                    />
                    {/* <FontAwesomeIcon style={{ textAlign: 'end' }} cursor='pointer' color="red" icon={faWindowClose as IconProp} /> */}
                </div>
                <div className="basketWrapper">
                    <div className="basketItems">
                        <div className="row">
                            {
                                Basket?.length > 0 ? Basket.reverse().map((item) => {
                                    return (
                                        <div key={item._id} className="basketItem col-lg-12 col-md-12 col-12">
                                            <div className="basketItemImage">
                                                <img src={`https://morning-peak-77048.herokuapp.com/${item.image}`} alt='yoxdu' />
                                            </div>
                                            <div className="basketItemInfos">
                                                <p>
                                                    {item.name}
                                                </p>
                                                <p>x {item.count}</p>
                                            </div>
                                            <div className="basketItemPrice">
                                                <p>{item.price}$</p>
                                                <FontAwesomeIcon
                                                    onClick={() => {

                                                        axios.put(`https://morning-peak-77048.herokuapp.com/updatebasket/${localStorage.getItem('userId')}`, Basket.filter((i) => i._id != item._id))
                                                            .then((
                                                                basketContext.setBasket(Basket.filter((i) => i._id != item._id))
                                                            ))
                                                            .catch((err) => {
                                                                window.location.href = `http://${window.location.host}/login`
                                                            })

                                                    }}
                                                    cursor='pointer' color="red" icon={faTrash as IconProp} />
                                            </div>

                                        </div>
                                    )
                                })
                                    :
                                    <h3 style={{ fontWeight: '700', margin: '0' }}>Cart is empty...</h3>
                            }

                        </div>
                    </div>
                    <div className="basketBottom">
                        <div className="basketTotalPrice">
                            <p>TOTAL :</p>
                            <p>{total} $</p>
                        </div>
                        <div className={`goToCheckout ${Basket?.length > 0 ? '' : 'disabledButton'}`}>
                            <Link to={`${Basket?.length > 0 ? '/checkout' : '/'}`} >
                                PROCEED TO CHECKOUT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="searchWrapper">
            <div className="searchZone">
                
                <div className="searchHead">
                    <div className="searchTitleWrapper">
                        <h4>SEARCH</h4>
                        <IoCloseOutline   onClick={() => {
                                document.querySelector('.searchWrapper')?.classList.remove('activeSearch')
                                setSearchProducts([])

                               
                            }} />
                    </div>
                    <input
                        placeholder="Start typing"
                        id="searchInput"
                        onKeyUp={(e) => {
                            console.log(e.currentTarget.value)
                            if (e.currentTarget.value.length > 2) {
                                axios.get(`https://morning-peak-77048.herokuapp.com/searchproducts/${e.currentTarget.value}`).then(({ data }) => {
                                    console.log(data)
                                    setSearchProducts(data)
                                    data.length == 0 ?
                                        setNoResult(true)
                                        :
                                        setNoResult(false)


                                    console.log(noResult)
                                }).catch((err) => {
                                    console.log(err)
                                })
                            } else {
                                setNoResult(false)

                                setSearchProducts([])
                            }
                        }}
                    />
                   
                </div>
                {
                    noResult ? <h3>No such products!</h3> : <div></div>

                }
                <div className="searchItems">
                    {searchProducts.map((p) => {
                        return (
                            <div key={p._id} className="searchItem">
                                <div className="searchImage">
                                    <img src={`https://morning-peak-77048.herokuapp.com/${p.image}`} />
                                </div>
                                <div className="searchItemInfo">
                                    <p>
                                        {p.name}
                                    </p>
                                    <p>
                                        {p.price} $
                                    </p>
                                </div>
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault()
                                        console.log('salam')
                                        const basketItem = {} as IBasketItem
                                        basketItem._id = p._id
                                        basketItem.count = 1
                                        basketItem.image = p.image
                                        basketItem.name = p.name
                                        basketItem.price = p.price
                                        basketItem.userId = localStorage.getItem('userId') || ''
                                        axios.post('https://morning-peak-77048.herokuapp.com/addtobasket', basketItem)
                                            .then((res) => {
                                                console.log(res)
                                                basketContext.setBasket(res.data as IBasketItem[])
                                                Swal.fire({
                                                    position: 'center',
                                                    icon: 'success',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                            })
                                            .catch((err) => {
                                                window.location.href = `http://${window.location.host}/login`
                                            })
                                    }}
                                    to='/'><IoBasket /></Link>
                            </div>
                        )
                    })}

                </div>
                </div>
               

            </div>
            <div>

            </div>
        </header>
    )
}