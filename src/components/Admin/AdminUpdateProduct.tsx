import React, { useEffect } from "react";
import * as Yup from 'yup';
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field } from 'formik';
import './AdminUpdateProduct.scss'
import { useState, useContext } from "react";
import { ProductContext } from "../../hooks";
import { useParams } from "react-router-dom";
import { ProductIF } from "../../interfaces";

export const AdminUpdateProduct = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState({} as ProductIF)
    const [file, setFile] = useState('')
    const changeHandler = (e) => {
        setFile(e.target.files[0])
    }
    const ProductSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        price: Yup.number()
            .required('Required')
            .min(1, 'minimum 1')
        ,
        stock: Yup.number()
            .required('Required')
            .min(1, 'minimum 1')
        ,
        image: Yup.string()
    });
    const productContext = useContext(ProductContext)

    useEffect(() => {
        const finded = productContext.products.find((p) => p._id == productId) as ProductIF
        setProduct(finded)
    }, [])

    return (
        <div className="container">
            <div className="adminUpdateProduct">
                <div>
                    Current Image : <img width={80} height={80} src={`http://localhost:3000/${product.image}`} />
                </div>
                <Formik
                    initialValues={{
                        name: product.name,
                        price: product.price,
                        stock: product.stock,
                        image: ''
                    }}
                    enableReinitialize
                    validationSchema={ProductSchema}
                    onSubmit={values => {
                        values.image = file;
                        const formData = new FormData();
                        formData.append('image', values.image)
                        formData.append('price', String(values.price))
                        formData.append('stock', String(values.stock))
                        formData.append('name', values.name)
                        console.log(formData)
                        axios.put(`http://localhost:3000/updateproduct/${productId}`, formData)
                            .then((res) => {
                                console.log(res)
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Successfully updated!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setTimeout(() => {
                                    window.location.href = `http://${window.location.host}/admin/products`
                                }, 1500);
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
                            <label>PRICE</label>
                            <Field name="price" />
                            {errors.price && touched.price ? (
                                <div style={{ color: "red" }}>{errors.price}</div>
                            ) : null}
                            <label>STOCK</label>
                            <Field name="stock" />
                            {errors.stock && touched.stock ? (
                                <div style={{ color: "red" }}>{errors.stock}</div>
                            ) : null}
                            <label>Image</label>
                            <input
                                onChange={changeHandler}
                                name="file" type='file' accept=".png,.jpeg,.webp,.jps" id="image"
                            />
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}