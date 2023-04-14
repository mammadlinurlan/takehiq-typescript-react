import React from "react";
import { Link } from "react-router-dom";
import './AdminProducts.scss'
import axios from "axios";
import Swal from "sweetalert2";
import { ISlider } from "../../interfaces";
interface ISliders {
    sliders : ISlider[]
}

export const AdminSliders: React.FC<ISliders> = ({ sliders }: ISliders) => {
    return (
        <div className="adminProductsPage container">
            <div style={{padding:'20px 0px'}}>
                <Link
                style={{textDecoration:'none',padding:'8px 15px',backgroundColor:'#27ae60',color:'white'}} 
                to='/admin/addslider'>ADD SLIDER</Link>
            </div>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sliders.map((i) => {
                            return (
                                <tr key={i._id}>
                                    <td><img width={60} height={60} style={{ objectFit: 'cover' }} src={`${i.image}`} /></td>
                                    <th scope="row">{i._id}</th>
                                    <td>{i.name}</td>
                                    <td>
                                        <Link
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            console.log(i._id)
                                            axios.get('https://morning-peak-77048.herokuapp.com/sliders')
                                            .then((res)=>{
                                                if(res.data.length == 1)
                                                {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Minimum one slider must stay!'
                                                    })
                                                }
                                                else{
                                                    axios.delete(`https://morning-peak-77048.herokuapp.com/deleteslider/${i._id}`)
                                                    .then((res)=>{
                                                        console.log(res.data)
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Done...',
                                                            text: 'Slider deleted!'
                                                        })
                                                    })
                                                    .catch((err)=>{
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Oops...',
                                                            text: 'Error occured!'
                                                        })
                                                    })
                                                }
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