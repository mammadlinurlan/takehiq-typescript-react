import React, { useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { IoPersonAddOutline, IoMailUnread, IoApps ,IoImage} from "react-icons/io5";
import { UserContext } from "../../hooks";
import './AdminIndex.scss'
import axios from "axios";
export const AdminIndex = () => {
    const user = useContext(UserContext)
    return user.user.isadmin ? (
        <div className="adminWrapper" style={{padding:'60px 0px'}}>
            <div className="container">
                <p>Hello {user.user.username} </p>
                <div className="adminLinks">
                    <Link to='/admin/orders'>Orders <IoMailUnread /></Link>
                    <Link to='/admin/products'>Products <IoApps /></Link>
                    <Link to='/admin/users'>Users <IoPersonAddOutline /></Link>
                    <Link to='/admin/sliders'>Sliders <IoImage /></Link>

                </div>
            </div>
        </div>

    ) : (<Navigate to='/' />)

}