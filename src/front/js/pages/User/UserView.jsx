import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../store/appContext.js'
import { FaCircleArrowLeft } from "react-icons/fa6";
import { UserNavbar } from '../../component/User/UserNavbar.jsx';
import { UserDashboard } from '../../component/User/UserDashboard.jsx';


export const UserView = () => {
    const { store, actions } = useContext(Context)
    
    useEffect(()=>{
        actions.getUser()
    },[])

    return (
        <>
            <UserNavbar />
            <UserDashboard />
        </>
    )
}