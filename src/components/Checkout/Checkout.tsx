import React, { useContext, useEffect, useState } from "react";
import * as Yup from 'yup'
import './Checkout.scss'
import { IBasket,IBasketItem,IMakeOrder } from "../../interfaces";
import { Formik, Form, Field } from 'formik';
import { BasketContext ,UserContext} from "../../hooks";
import { Navigate,redirect } from "react-router-dom";
import axios from "axios";
import { Nav } from "react-bootstrap";
import Swal from "sweetalert2";

export const Checkout: React.FC<IBasket> = ({ basketArray }: IBasket) => {
    const basketContext = useContext(BasketContext)
    const user = useContext(UserContext)
    const Basket = basketContext.basket as IBasketItem[]
    const [total,setTotal] = useState(0)
    useEffect(() => {
        setTotal(
            basketArray.reduce((total, item) => {
                return total += item.price * item.count
            }, 0)
        )
    }, [basketArray])
    const orderSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        surname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        address: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        country: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        city: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        zip: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phone: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        state: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });
    return localStorage.getItem('userId') ? (
        
            <div  className="row">
                {
                    Basket?.length > 0 ?
                    <>
                       <div className="col-lg-7 col-md-12 col-12 checkoutLeft">
                    <div className="container">
                        <Formik
                            initialValues={{
                                name:'',
                                address :'',
                                surname : '',
                                country : '',
                                city : '',
                                state : '',
                                zip : '',
                                phone : ''
                            }}
                            validationSchema={orderSchema}
                            onSubmit={values => {
                                const order : IMakeOrder = {
                                    userId : user.user.id,
                                    name : values.name,
                                    surname : values.surname,
                                    address : values.address,
                                    city : values.city,
                                    state : values.state,
                                    zip : values.zip,
                                    country  : values.country,
                                    phone : values.phone,
                                    status : 1,
                                    totalPrice : total,
                                    orderItems : basketArray,
                                    date : new Date()
                                }
                                
                                axios.post(`http://localhost:3000/makeorder/${localStorage.getItem('userId')}`,order)
                                .then((res)=>{
                                    console.log(res)
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'You`ve successfully ordered!',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                      setTimeout(() => {
                                        window.location.href = `http://${window.location.host}`
                    
                                    }, 1500);
                                    })
                                .catch((err)=>{
                                    <Navigate to='/login'/>
                                })
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field name="country" placeholder="Country" className="col-lg-12 col-md-12 col-12" />
                                    {errors.country && touched.country ? (
                                        <div style={{ color: "red" }}>{errors.country}</div>
                                    ) : null}
                                    <Field  name="name" placeholder='Name' className='col-lg-6 col-md-6 col-12 ' />
                                    {errors.name && touched.name ? (
                                        <div style={{ color: "red" }}>{errors.name}</div>
                                    ) : null}
                                     <Field  name="surname" placeholder='Surname' className='col-lg-6 col-md-6 col-12 ' />
                                    {errors.surname && touched.surname ? (
                                        <div style={{ color: "red" }}>{errors.surname}</div>
                                    ) : null}
                                      <Field name="address" placeholder="Address" className="col-lg-12 col-md-12 col-12" />
                                    {errors.address && touched.address ? (
                                        <div style={{ color: "red" }}>{errors.address}</div>
                                    ) : null}
                                       <Field name="state" placeholder="State" className="col-lg-12 col-md-12 col-12" />
                                    {errors.state && touched.state ? (
                                        <div style={{ color: "red" }}>{errors.state}</div>
                                    ) : null}
                                      <Field  name="zip" placeholder='Zip' className='col-lg-6 col-md-6 col-12 ' />
                                    {errors.zip && touched.zip ? (
                                        <div style={{ color: "red" }}>{errors.zip}</div>
                                    ) : null}
                                     <Field  name="city" placeholder='City' className='col-lg-6 col-md-6 col-12 ' />
                                    {errors.city && touched.city ? (
                                        <div style={{ color: "red" }}>{errors.city}</div>
                                    ) : null}
                                     <Field name="phone" placeholder="Phone" className="col-lg-12 col-md-12 col-12" />
                                    {errors.phone && touched.phone ? (
                                        <div style={{ color: "red" }}>{errors.phone}</div>
                                    ) : null}
                                    <button type="submit">Confirm order</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12 col-12 checkoutRight">
                    <div className="container">
                        <div className="checkoutWrapper">

                            <div className="checkoutItems">
                                {
                                    basketArray.map((i) => {
                                        return (
                                            <div key={i._id} style={{ justifyContent: 'space-between' }} className="checkoutItem  d-flex">
                                                <div className=" col-lg-2 col-md-2 col-2" style={{ position: 'relative' }}  >
                                                    <img style={{ width: '100%', objectFit: 'cover' }} src={`http://localhost:3000/${i.image}`} />
                                                    <div style={{ position: 'absolute', zIndex: '12132321213', right: '-10px', top: '-10px', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#818181', borderRadius: "50%", color: 'white', fontWeight: '700', fontSize: '12px' }}>
                                                        {i.count}
                                                    </div>
                                                </div>
                                                <div style={{ justifyContent: 'space-between' }} className="d-flex col-lg-9 col-md-9 col-9" >
                                                    <p>{i.name}</p>
                                                    <p>{i.price}AZN</p>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            <div style={{ justifyContent: 'space-between' }} className="d-flex">
                                <h1>Total :</h1>
                                <h1>{total}AZN</h1>

                            </div>
                        </div>
                    </div>


                </div>  
                    </>
                 
                : 
                <p
                style={{margin:'0',textAlign:'center',fontSize:'25px',padding:'120px 0px'}}
                >YOUR CARD IS EMPTY</p>

                }
               
            </div>
    )
    :
    (
        <Navigate to='/login'/>
    )
}

