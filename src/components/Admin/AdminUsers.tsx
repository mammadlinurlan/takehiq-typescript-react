import React from "react";
import { IUser } from "../../interfaces";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
interface IUsers{
    users : IUser[]
}

export const AdminUsers:React.FC<IUsers> = ({users}:IUsers) => {
    console.log(users)
    const navigate = useNavigate()
    return(
       
       <div className="adminUsers">
            {
                 <table style={{margin:'50px 0px'}} className="table table-hover table-dark">
                 <thead>
                     <tr>
                         <th scope="col">ID</th>
                         <th scope="col">Username</th>
                         <th scope="col">Email</th>
                         <th scope="col">Options</th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                         users.map((i) => {
                             return (
                                 <tr key={i._id}>
                                     <th scope="row">{i._id}</th>
                                     <td>{i.username}</td>
                                     <td>{i.email}</td>
                                     <td>
                                         <Link
                                         onClick={(e)=>{
                                            e.preventDefault()
                                            axios.put(`https://morning-peak-77048.herokuapp.com/giverole/${i._id}`)
                                            .then((res)=>{
                                                console.log(res)
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Done...',
                                                    text: 'Role changed!'
                                                })
                                            })
                                            .then(()=>{
                                               navigate(0)
                                            })
                                            .catch((err)=>{
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: 'Error occured!'
                                                })
                                            })
                                         }}
                                         style={{textDecoration:'none',padding:'8px 15px',backgroundColor: i.isadmin ? 'red' : 'green',color:'white'}} to='' >{i.isadmin ? 'Take admin role' : "Give admin role"}</Link>
                                         <Link
                                         onClick={(e)=>{
                                             e.preventDefault()
                                             console.log(i._id)
                                             axios.delete(`https://morning-peak-77048.herokuapp.com/deleteuser/${i._id}`)
                                             .then((res)=>{
                                                 console.log(res)
                                                 Swal.fire({
                                                     icon: 'success',
                                                     title: 'Done...',
                                                     text: 'User deleted!'
                                                 })
                                             })
                                             .then(()=>{
                                                navigate(0)
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
            }
       </div>
    )
}