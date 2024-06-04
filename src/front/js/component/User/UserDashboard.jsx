import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext.js"

import { FaCircleArrowLeft, FaUserGraduate } from 'react-icons/fa6';
import { Certificate } from '../User/Certificate.jsx';

import { UserProfile } from './UserProfile.jsx';
import { UserPayment } from './UserPayment.jsx';
import { CoursesContainer } from '../Courses/CoursesContainer.jsx';
import { WelcomeUser } from './WelcomeUser.jsx';


import { CgProfile } from "react-icons/cg";
import { MdOutlineQuiz } from "react-icons/md"
import { MdOutlineChromeReaderMode } from "react-icons/md"
import { VscFileSubmodule } from "react-icons/vsc"
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import { PiCertificate } from "react-icons/pi"
import { MdErrorOutline } from "react-icons/md";
import { CourseWelcome } from '../../pages/Courses/CourseWelcome.jsx';
import { GetModuleUser } from './GetModulesUser.jsx'
import { ManagerProfile } from '../Manager/ManagerProfile.jsx';

export const UserDashboard = () => {
    const { store, actions } = useContext(Context)
    const [buttonSelected, setButtonSelected] = useState(<WelcomeUser />)
    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));

    const [hovered, setHovered] = useState(false)
    
    const handleMouseEnter = () => {
        setHovered(true)
        console.log(hovered => hovered + 1)
    }

    const handleMouseLeave = () => {
        setHovered(false)
    }

    function homeStudents() {
        setButtonSelected(<WelcomeUser />)
    }

    function handleViewCourse() {
        setButtonSelected(<GetModuleUser />)
    }

    const handleMyCourses = () => {
        setButtonSelected(<CourseWelcome />)
    }

    const handleMyProfile = () => {
        setButtonSelected(<ManagerProfile />)
    }

    const handleMyPayment = () => {
        setButtonSelected(<UserPayment />)
    }

    const handleCertificate = () => {
        setButtonSelected(<Certificate />)
    }


    const navigate = useNavigate()

    function handleHome() {
        navigate('/')
    }

    const tokenPayString = localStorage.getItem("token-accessCourse")
    console.log(tokenPayString)

    return (
        <div className="row">

            <button
                className="btn btn-dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
            >
                MENU
            </button>



            <div className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel" style={{ backgroundColor: "#F5F5F5" }}>


                <div className="offcanvas-header">
                    <div className="col d-flex justify-content-end">
                        {store.user ? (
                            store.user[`access_to_${store.currentRole}`]?.map((item, index) => (
                                item.email === userToLogin.email ? (
                                    <span className='mx-2 letter' key={index}>
                                        Welcome, <strong>{item.name.toUpperCase()}</strong> <strong>{item.lastName.toUpperCase()}</strong>
                                    </span>
                                ) : null
                            ))
                        ) : (
                            <p className="text-center">No hay</p>
                        )}
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div> 

                <div className="offcanvas-body">
                    <div className="text-center">
                        <div className="fs-4 my-3" onClick={handleHome} style={{ cursor: 'pointer' }}>
                            <FaCircleArrowLeft /> HOME
                        </div>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleMyProfile}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <CgProfile />
                                </div>
                                <div>
                                    <h5>Profile</h5>
                                </div>
                            </div>
                        </button>

                        <button
                            className="btn btn-outline-dark my-2 w-75"
                            disabled={tokenPayString === ""}
                        >

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineQuiz />
                                </div>
                                <div>
                                    <h5>View Quizzes</h5>
                                </div>
                            </div>
                        </button>

                        <button
                            className="btn btn-outline-dark my-2 w-75"
                            disabled={tokenPayString === ""}
                            onClick={handleViewCourse}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineChromeReaderMode />
                                </div>
                                <div>
                                    <h5>View Modules</h5>
                                </div>
                            </div>
                        </button>

                        <button
                            className="btn btn-outline-dark my-2 w-75"
                            disabled={tokenPayString === ""}
                            onClick={handleMyPayment}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlinePayment />
                                </div>
                                <div>
                                    <h5>View Payment</h5>
                                </div>
                            </div>
                        </button>

                        <button
                            className="btn btn-outline-dark my-2 w-75"
                            disabled={tokenPayString === ""}
                            onClick={handleMyCourses}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <AiOutlineFundView />
                                </div>
                                <div>
                                    <h5>View Courses</h5>
                                </div>
                            </div>
                        </button>

                        <button
                            className="btn btn-outline-dark my-2 w-75"
                            disabled={tokenPayString === ""}
                        >

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <FaUserGraduate />
                                </div>
                                <div>
                                    <h5>View Teachers</h5>
                                </div>
                            </div>
                        </button>



                        <button className='btn btn-outline-dark my-2 w-75' disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <VscFileSubmodule />
                                </div>
                                <div>
                                    <h5>Files</h5>
                                </div>
                            </div>
                        </button>

                        <button
                            className="btn btn-outline-dark my-2 w-75"
                            disabled={tokenPayString === ""}
                            onClick={handleCertificate}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <PiCertificate />
                                </div>
                                <div>
                                    <h5>Certificate</h5>
                                </div>
                            </div>
                        </button>

                        {/* <button
                            className="btn btn-outline-dark my-2 w-75"
                            disabled={tokenPayString === ""}
                        >

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdErrorOutline />
                                </div>
                                <div>
                                    <h5>Sin datos</h5>
                                </div>
                            </div>
                        </button> */}

                    </div>
                </div>
            </div>

            <div>
                {buttonSelected}
            </div>
        </div>
    )
}


