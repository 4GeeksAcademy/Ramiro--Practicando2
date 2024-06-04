import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext.js";
import "../../../styles/home.css";
import { TeacherDashboard } from "../../component/Teacher/TeacherDashboard.jsx"
import { TeacherNavbar } from "../../component/Teacher/TeacherNavbar.jsx";
import { TeacherCourses } from "../../component/Teacher/TeacherCourses.jsx"



export const TeacherView = () => {
    const { store, actions } = useContext(Context)
    
    useEffect(()=>{
        actions.getUser()
    },[])

    return (
        <div>
            <TeacherNavbar />
            <TeacherDashboard />
        </div>

    )
}