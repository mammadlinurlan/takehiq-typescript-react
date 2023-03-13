import React, { useContext } from "react";
import { IOrders } from "../../interfaces";
import './AdminOrders.scss'
import Swal from "sweetalert2";
import { OrderContext } from "../../hooks";
import axios from "axios";
export const AdminOrders: React.FC<IOrders> = ({ orders }: IOrders) => {
    const [active, setActive] = React.useState(null)
    const toggleAccordion = (index) => {
        active == index ? setActive(null) : setActive(index)
    }
    const orderContext = useContext(OrderContext)
    return orders?.length > 0 ? (
        <div className="adminOrdersPage container">
            <div className="adminOrders" style={{ padding: '40px 0px' }}>
                {orders.map((o, index) => {
                    return (
                        <div key={index} className="userOrder">
                            <div
                                onClick={() => {
                                    toggleAccordion(index)
                                }}
                                className="userOrderTop">
                                <p className="orderDate">
                                    {o?.date?.toLocaleString()}
                                </p>
                                <p className="orderPrice">
                                    {o.totalPrice}$
                                </p>
                                <p onClick={() => {
                                    Swal.fire({
                                        title: 'CHANGE ORDER STATUS',
                                        showDenyButton: true,
                                        showCancelButton: true,
                                        confirmButtonText: 'Confirm',
                                        denyButtonText: `Deny`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {
                                            axios.put(`https://morning-peak-77048.herokuapp.com/orderstatus?orderId=${o._id}&status=${Number(2)}&userId=${o.userId}`)
                                                .then((res) => {
                                                    console.log(res)
                                                    orderContext.setOrders(res.data)
                                                    Swal.fire('Saved!', '', 'success')
                                                })
                                                .catch((err) => {
                                                    console.log(err)
                                                    Swal.fire('Changes are not saved', '', 'info')
                                                })

                                        } else if (result.isDenied) {
                                            axios.put(`https://morning-peak-77048.herokuapp.com/orderstatus?orderId=${o._id}&status=${Number(3)}&userId=${o.userId}`)
                                                .then((res) => {
                                                    console.log(res)
                                                    orderContext.setOrders(res.data)
                                                    Swal.fire('Saved!', '', 'success')
                                                })
                                                .catch((err) => {
                                                    console.log(err)
                                                    Swal.fire('Changes are not saved', '', 'info')
                                                })
                                        }
                                    })
                                }}
                                    className={`orderStatus status${o.status}`}>
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
                                                <img src={`https://morning-peak-77048.herokuapp.com/${oi.image}`} />
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
            <h2 style={{ textAlign: 'center', padding: '100px 0px' }}>No orders</h2>
        )
}