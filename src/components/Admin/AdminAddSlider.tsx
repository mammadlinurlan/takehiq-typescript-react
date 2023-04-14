import React, { useState } from "react";
import * as Yup from 'yup';
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field } from 'formik';
import { ISlider } from "../../interfaces";
import './AdminCreateProduct.scss'
import { useNavigate } from "react-router-dom";

export const AdminAddSlider = () => {
    const navigate = useNavigate()

    const SliderSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        image: Yup.string()
            .min(2, 'Too Short!')
            .max(200, 'Too Long!')
            .required('Required'),
    });
    return (
        <div className="createProduct container">
            <Formik
                initialValues={{
                    name: '',
                    image: ''
                }}
                validationSchema={SliderSchema}
                onSubmit={values => {
                    const slider = {} as ISlider
                    slider.image = values.image
                    slider.name = values.name
                    console.log(slider)                    
                    axios.post('https://morning-peak-77048.herokuapp.com/addslider', slider)
                        .then((res) => {
                            console.log(res)
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Successfully added!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .then(() => {
                            navigate('/admin/sliders')
                        })
                        .catch((err) => {
                            console.log(err)
                            Swal.fire({
                                icon: 'error',
                                title: 'Error...',
                                text: 'Fill the inputs correctly!'
                            })
                        })

                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <label>NAME</label>
                        <Field name="name" />
                        {errors.name && touched.name ? (
                            <div style={{ color: "red" }}>{errors.name}</div>
                        ) : null}
                        <label>IMAGE LINK</label>
                        <Field name="image" />
                        {errors.image && touched.image ? (
                            <div style={{ color: "red" }}>{errors.image}</div>
                        ) : null}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}