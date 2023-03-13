import React from "react";
import { Link } from "react-router-dom";
import './AdminProducts.scss'
import { IProducts } from "../../interfaces";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ProductContext } from "../../hooks";

export const AdminProducts: React.FC<IProducts> = ({ productsArray }: IProducts) => {
    const productContext = useContext(ProductContext)
    return (
        <div className="adminProductsPage container">
            <div style={{padding:'20px 0px'}}>
                <Link
                style={{textDecoration:'none',padding:'8px 15px',backgroundColor:'#27ae60',color:'white'}} 
                to='/admin/createproduct'>CREATE PRODUCT</Link>
            </div>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsArray.map((i) => {
                            return (
                                <tr key={i._id}>
                                    <td><img width={60} height={60} style={{ objectFit: 'cover' }} src={`https://morning-peak-77048.herokuapp.com/${i.image}`} /></td>
                                    <th scope="row">{i._id}</th>
                                    <td>{i.name}</td>
                                    <td>{i.price}</td>
                                    <td>
                                        <Link style={{textDecoration:'none',padding:'8px 15px',backgroundColor:'#f39c12',color:'white'}} to={`/admin/updateproduct/${i._id}`} >Update</Link>
                                        <Link
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            console.log(i._id)
                                            axios.delete(`https://morning-peak-77048.herokuapp.com/deleteproduct/${i._id}`)
                                            .then((res)=>{
                                                console.log(res.data)
                                                productContext.setProducts(res.data)
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Done...',
                                                    text: 'Product deleted!'
                                                })
                                            })
                                            .catch((err)=>{
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: 'Error occured!'
                                                })
                                            })
                                        }}
                                        style={{textDecoration:'none',padding:'8px 15px',backgroundColor:'#c0392b',color:'white',marginLeft:'12px'}} to=''>Delete</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}