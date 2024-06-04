

import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from "../../store/appContext.js"

import { FaCircleArrowLeft, FaUserGraduate } from "react-icons/fa6";
import { TeacherCourses } from '../Teacher/TeacherCourses.jsx'
import { TeacherStudents } from './TeacherStudents.jsx';
import { TeacherFiles } from './TeacherFiles.jsx';
import { TeacherMyPayment } from './TeacherMyPayment.jsx';
import { TeacherSettings } from './TeacherSettings.jsx';
import { UploadFile } from './UploadFile.jsx';
import { PostCourse } from './PostCourse.jsx';
import { QuizzForm } from './QuizzForm.jsx';
import { TeacherProfile } from './TeacherProfile.jsx';
import { ModuleCourse } from '../Module/ModuleCourse.jsx'

import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { LuBookUp } from "react-icons/lu";
import { RiSoundModuleFill } from "react-icons/ri";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc"
import { TbCategoryPlus } from "react-icons/tb"
import { GrUpdate } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineQuiz } from "react-icons/md"
import { MdOutlineChromeReaderMode } from "react-icons/md"
import { VscFileSubmodule } from "react-icons/vsc"
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import { PiCertificate } from "react-icons/pi"
import { MdErrorOutline } from "react-icons/md";
import { WelcomeTeacher } from './WelcomeTeacher.jsx';

import { Message } from '../Message.jsx'
import { ManagerProfile } from '../Manager/ManagerProfile.jsx';


export const TeacherDashboard = () => {
    const { store, actions } = useContext(Context)
    
    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));
    const [hovered, setHovered] = useState(false)
    
    const handleMouseEnter = () => {
        setHovered(true)
        console.log(hovered => hovered + 1)
    }

    const handleMouseLeave = () => {
        setHovered(false)
    }

    const [buttonSelected, setButtonSelected] = useState(<WelcomeTeacher />)

    const handleMyCourses = () => {
        setButtonSelected(<TeacherCourses />)
    }

    const handleProfile = () => {
        setButtonSelected(<ManagerProfile />)
    }

    const handleMyStudents = () => {
        setButtonSelected(<TeacherStudents />)
    }

    const handleMyFiles = () => {
        setButtonSelected(<TeacherFiles />)
    }

    const handleMyPayment = () => {
        setButtonSelected(<TeacherMyPayment />)
    }
    const handlePDF = () => {
        setButtonSelected(<UploadFile />)
    }

    const handleSettings = () => {
        setButtonSelected(<TeacherSettings />)
    }

    const handlePostCourse = () => {
        setButtonSelected(<PostCourse />)
    }

    const handleQuizzes = () => {
        setButtonSelected(<QuizzForm />)
    }
    const navigate = useNavigate()
    function handleHome() {
        navigate('/')
    }

    

    return (
        <div className="row position-relative">

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

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleProfile}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <CgProfile />
                                </div>
                                <div>
                                    <h5>Profile</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" disabled>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdPayments />
                                </div>
                                <div>
                                    <h5>Create Payment</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handlePostCourse}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <LuBookUp />
                                </div>
                                <div>
                                    <h5>Create Courses</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <RiSoundModuleFill />
                                </div>
                                <div>
                                    <h5>Create Modules</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleQuizzes}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    < VscGitPullRequestGoToChanges />
                                </div>
                                <div>
                                    <h5>Create Quizzes</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <TbCategoryPlus />
                                </div>
                                <div>
                                    <h5>Create Category</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <GrUpdate />
                                </div>
                                <div>
                                    <h5>Update Courses</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineQuiz />
                                </div>
                                <div>
                                    <h5>View Quizzes</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineChromeReaderMode />
                                </div>
                                <div>
                                    <h5>View Modules</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleMyPayment}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlinePayment />
                                </div>
                                <div>
                                    <h5>History Payment</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleMyCourses}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <AiOutlineFundView />
                                </div>
                                <div>
                                    <h5>View Courses</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' onClick={handleSettings}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <FaUserGraduate />
                                </div>
                                <div>
                                    <h5>Settings</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' onClick={handleMyStudents}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <BsFillPersonLinesFill />
                                </div>
                                <div>
                                    <h5>View Students</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' onClick={handleMyFiles}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <VscFileSubmodule />
                                </div>
                                <div>
                                    <h5>Files</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' onClick={handlePDF}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <PiCertificate />
                                </div>
                                <div>
                                    <h5>Certificate</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdErrorOutline />
                                </div>
                                <div>
                                    <h5>Sin datos</h5>
                                </div>
                            </div>
                        </button>

                    </div>
                </div>
            </div>

            <div>
                {buttonSelected}
            </div>
        </div>
    )
}

