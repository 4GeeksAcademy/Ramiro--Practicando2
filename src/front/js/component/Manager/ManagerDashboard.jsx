import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext.js"

import { FaCircleArrowLeft, FaUserGraduate } from 'react-icons/fa6';
import { Certificate } from '../User/Certificate.jsx';

import { ManagerCourses } from '../Manager/ManagerCourses.jsx';
import { ManagerProfile } from '../Manager/ManagerProfile.jsx';
import { Payments } from './Payments.jsx';
import { Teachers } from './Teachers.jsx';
import { ActiveUsers } from './ActiveUsers.jsx';
import { GeneralFiles } from '../Manager/GeneralFiles.jsx';
import { PostCourseM } from './PostCourseM.jsx';
import { CourseCard } from '../Courses/CourseCard.jsx';
import { ModuleCourse } from '../Module/ModuleCourse.jsx'
import { QuizzesCourse } from '../Quizzes/QuizzesCourse.jsx';
import { CreateCategory } from './CreateCategory.jsx';
import { GetQuizzes } from './GetQuizzes.jsx';
import { PostCertificate } from '../Teacher/PostCertificate.jsx';
import { CreatePayment } from './CreatePayment.jsx';
import { GetPayment } from './GetPayment.jsx';
import { GetModule } from './GetModule.jsx';
import { WelcomeManager } from './WelcomeManager.jsx';

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

import { HistoryCoursesUser } from './HistoryCoursesUser.jsx';
import { UpdateQuizzes } from './UpdateQuizzes.jsx';

import { Message } from '../Message.jsx'

export const ManagerDashboard = () => {
    const { store, actions } = useContext(Context)
    
    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));
    const [hovered, setHovered] = useState(false)
    const [buttonSelected, setButtonSelected] = useState(<WelcomeManager />)

    const handleMouseEnter = () => {
        setHovered(true)
        console.log(hovered => hovered + 1)
    }

    const handleMouseLeave = () => {
        setHovered(false)
    }

    function homeManager() {
        setButtonSelected(<WelcomeManager />)
    }

    const handleCreateCourse = () => {
        setButtonSelected(<PostCourseM />)
    }

    const handleGetPayment = () => {
        setButtonSelected(<GetPayment />)
    }

    const handleCreatePayment = () => {
        setButtonSelected(<CreatePayment />)
    }

    const handleUpdateCourse = () => {
        setButtonSelected(<CourseCard />)
    }

    const handleMyCourses = () => {
        setButtonSelected(<ManagerCourses />)
    }

   /*  const handleMyModule = () => {
        setButtonSelected(<ModuleCourse />)
        actions.getModules()
    } */

    const handleMyQuizzes = () => {
        setButtonSelected(<QuizzesCourse />)
        actions.getQuizzes()
    }

    const handleGetQuizzes = () => {
        setButtonSelected(<GetQuizzes />)
        actions.getQuizzes()
    }


    const handleGetModules = () => {
        setButtonSelected(<GetModule />)

    }

    const handleMyProfile = () => {
        setButtonSelected(<ManagerProfile />)
    }

    const handlePayments = () => {
        setButtonSelected(<Payments />)
    }

    const handleTeachers = () => {
        setButtonSelected(<Teachers />)
    }

    const handleUsers = () => {
        setButtonSelected(<ActiveUsers />)
    }

    const HandleFiles = () => {
        setButtonSelected(<GeneralFiles />)
    }

    const handlePDF = () => {
        setButtonSelected(<PostCertificate />)
    }

    const handleCreateCategory = () => {
        setButtonSelected(<CreateCategory />)
    }

    const handleHistoryCoursesUsers = () => {
        setButtonSelected(<HistoryCoursesUser />)
    }

    const navigate = useNavigate()
    function handleHome() {
        navigate('/')
    }
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

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleCreatePayment}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdPayments />
                                </div>
                                <div>
                                    <h5>Create Payment</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleCreateCourse}>

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

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleMyQuizzes}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    < VscGitPullRequestGoToChanges />
                                </div>
                                <div>
                                    <h5>Create Quizzes</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' onClick={handleCreateCategory}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <TbCategoryPlus />
                                </div>
                                <div>
                                    <h5>Create Category</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleUpdateCourse}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <GrUpdate />
                                </div>
                                <div>
                                    <h5>Update Courses</h5>
                                </div>
                            </div>
                        </button>


                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleGetQuizzes}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineQuiz />
                                </div>
                                <div>
                                    <h5>View Quizzes</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleGetModules}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineChromeReaderMode />
                                </div>
                                <div>
                                    <h5>View Modules</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleGetPayment}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlinePayment />
                                </div>
                                <div>
                                    <h5>View Payment</h5>
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

                        <button className='btn btn-outline-dark my-2 w-75' onClick={handleTeachers}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <FaUserGraduate />
                                </div>
                                <div>
                                    <h5>View Teachers</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' onClick={handleUsers}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <BsFillPersonLinesFill />
                                </div>
                                <div>
                                    <h5>View Users</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-dark my-2 w-75' onClick={HandleFiles}>

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

                        <button className="btn btn-outline-dark my-2 w-75" onClick={handleHistoryCoursesUsers}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border fs-3 rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdErrorOutline />
                                </div>
                                <div>
                                    <h5>History Courses</h5>
                                </div>
                            </div>
                        </button>

                    </div>
                </div>
            </div>

            <div className='text-center'>
                {buttonSelected}
            </div>
        </div>
    )
}