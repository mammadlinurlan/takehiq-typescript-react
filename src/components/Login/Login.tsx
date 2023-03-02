import React, { useContext } from "react";
import './Login.scss'
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import { ILoginForm, IUser } from "../../interfaces";
import * as Yup from 'yup';
import axios from "axios";
import Swal from "sweetalert2";
import { IoLogOutOutline } from "react-icons/io5";
import { UserContext, useUserContext, BasketContext } from "../../hooks";
axios.defaults.withCredentials = true

export const Login: React.FC<IUser> = ({ orders }: IUser) => {
    const [active,setActive] = React.useState(null)
    const userContext = useContext(UserContext)
    const basketContext = useContext(BasketContext)
    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    });
    const LoginData = {} as ILoginForm
    const logout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        axios.get('http://localhost:3000/logout').then((res) => {
            console.log(res.status)
            localStorage.removeItem('userId')
            userContext.setUser({} as IUser)
            basketContext.setBasket(null)
        })
    }
    const toggleAccordion = (index) => {
       active == index ? setActive(null) : setActive(index)
    }
    return localStorage.getItem('userId') ?
        (
            <div className="container wrapperOrders">
                <h3>Welcome {userContext.user.username}</h3>
                <h3 className="logout" onClick={logout}>
                    Logout <IoLogOutOutline/>
                </h3>
                <p className="ordersText">
                    Your Orders :
                </p>
                <div className="userOrders">
                    {orders?.map((o,index) => {
                        return (
                            <div key={index} className="userOrder">
                                <div
                                onClick={()=>{
                                   toggleAccordion(index)
                                }}
                                 className="userOrderTop">
                                    <p className="orderDate">
                                        {o?.date?.toLocaleString()}
                                    </p>
                                    <p className="orderPrice">
                                        {o.totalPrice}$
                                    </p>
                                    <p  className={`orderStatus status${o.status}`}>
                                      {o.status == 3 ? 'DENIED' : ''}
                                      {o.status == 1 ? 'PENDING' : ''}
                                      {o.status == 2 ? 'ACCEPTED' : ''}

                                    </p>
                                </div>
                                <div className={`userOrderBottom ${active == index ? 'activeOrderAccordion' : ''}`}>
                                    {
                                        o.orderItems.map((oi) => {
                                            return (
                                                <div className="orderItemInfo">
                                                    <img src={`http://localhost:3000/${oi.image}`} />
                                                    <p>COUNT : {oi.count}</p>
                                                    <p>PRICE : {oi.price}$</p>
                                                </div>


                                            )
                                        })
                                    }

                                </div>
                            </div>
                        )
                    })}
                </div>
               
            </div>
        )
        :
        (
            <div className="login">
                <div className="loginWrapper col-lg-4 col-md-6 col-10">
                    <h1>LOGIN INTO ACCOUNT</h1>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            LoginData.username = values.username;
                            LoginData.password = values.password
                            axios.post('http://localhost:3000/login', LoginData)
                                .then((result) => {
                                    console.log(result)
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Successfully logged!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })

                                    const user = result.data as IUser
                                    userContext.setUser(user)
                                    localStorage.setItem('userId', user.id)
                                    setTimeout(() => {
                                        window.location.href = `http://${window.location.host}/`
                                    }, 1500);
                                })
                                .catch((err) => {
                                    console.log(err)
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Username or password is wrong!',

                                    })
                                })
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <label>USERNAME</label>
                                <Field name="username" />
                                {errors.username && touched.username ? (
                                    <div style={{ color: "red" }}>{errors.username}</div>
                                ) : null}
                                <label>PASSWORD</label>
                                <Field type="password" name="password" />
                                {errors.password && touched.password ? (
                                    <div style={{ color: "red" }}>{errors.password}</div>
                                ) : null}
                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                    <Link to='/register'>Create an account</Link>
                </div>
            </div>
        )
}