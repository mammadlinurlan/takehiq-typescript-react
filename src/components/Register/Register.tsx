import React from "react";
import axios from "axios";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link,Navigate,redirect } from "react-router-dom";
import { IRegister } from "../../interfaces";
import { data } from "jquery";
import Swal from 'sweetalert2'

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
          ),
    confirmpassword: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const Register = () => {
    const RegisterForm = {} as IRegister

    return !localStorage.getItem('userId') ? (
        <div style={{ height: '100vh' }} className="login">
            <div className="loginWrapper col-lg-4 col-md-6 col-10">
                <h1>CREATE ACCOUNT</h1>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        confirmpassword: '',
                        email: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        RegisterForm.isadmin= false;
                        RegisterForm.email = values.email
                        RegisterForm.password = values.password
                        RegisterForm.confirmpassword = values.confirmpassword
                        RegisterForm.username = values.username
                        axios.post('https://morning-peak-77048.herokuapp.com/postuser',RegisterForm)
                        .then((result)=>{
                            console.log(result)
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Successfully registered!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(() => {
                                window.location.href = `http://${window.location.host}/`
            
                            }, 1500);
                        })
                        .catch((err)=>{
                            console.log(err)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Username or email is already taken!',
            
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
                            <label>CONFIRM PASSWORD</label>

                            <Field type="password" name="confirmpassword" />
                            {errors.confirmpassword && touched.confirmpassword ? (
                                <div style={{ color: "red" }}>{errors.confirmpassword}</div>
                            ) : null}
                            <label>EMAIL</label>

                            <Field name="email" type="email" />
                            {errors.email && touched.email ? <div style={{ color: "red" }}>{errors.email}</div> : null}
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>

                <Link to='/login'>Already have an account?</Link>
            </div>
        </div>
    )
    :
    <Navigate to='/' />
}