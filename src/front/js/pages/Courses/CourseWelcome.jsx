import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { GoArrowLeft } from "react-icons/go";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";

export const CourseWelcome = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid" style={{ position: "relative", textAlign: "center", height: "100vh", padding: 0, margin: 0 }}>
            <div>
                <img src="https://juanmanueltorres.com/wp-content/uploads/2023/05/Evolucio%CC%81n-de-los-medios-digitales-1-sitio-Juan-Manuel-Torres-Esquivel.png" className="img-fluid opacity-50" alt="Manager" style={{ height: "50vh", width: "100%", objectFit: "cover" }} />
            </div>
            <div className='text-black fw-bolder rounded-pill' style={{ position: "absolute", top: "20%", width: "100%", color: "white" }}>
                <h1 className='fs-1 fw-bolder'>Welcome, to the Course!</h1>
                <h5>It's learning time...</h5>
            </div>
            <div className="container-fluid">
                <div className='row d-flex justify-content-center'>
                    <div className="col-5 border rounded-4 my-3 mx-3 px-2 py-2 d-flex flex-column align-items-center">
                        {/* Title */}
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='p-3 mx-3 border rounded-circle d-flex justify-content-center align-items-center'>
                                <BsFillPersonLinesFill />
                            </div>
                            <div>
                                <h3>Modules Information</h3>
                            </div>
                        </div>

                        <div className="row w-100">
                            <div className="col-12">
                                <div className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100" style={{ backgroundColor: '#AAAAAA' }}>
                                    <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            #
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Description Content
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Title
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Total Time video
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {store.modules && store.modules.Modules && store.modules.Modules.length === 0
                            ? "No hay modules cargados"
                            : store.modules && store.modules.Modules && store.modules.Modules.map((item) => (
                                <div className="row w-100" key={item.id}>
                                    <div className="col-12">
                                        <div className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100" style={{ backgroundColor: item.id % 2 === 0 ? '#F0F0F0' : '#C8C8C8' }}>
                                            <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.id}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.descriptionContent}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.title}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '50%' }}>
                                                    {item.totalVideo}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="col-6 border rounded-4 my-3 mx-3 px-2 py-2 d-flex flex-column align-items-center">
                        {/* Title */}
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='p-3 mx-3 border rounded-circle d-flex justify-content-center align-items-center'>
                                <FaUserGraduate />
                            </div>
                            <div>
                                <h3>Quizzes Information</h3>
                            </div>
                        </div>

                        <div className="row w-100">
                            <div className="col-12">
                                <div className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100" style={{ backgroundColor: '#AAAAAA' }}>
                                    <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            #
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Question Title
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Answer
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Approved
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Percentage
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {store.quizzes && store.quizzes.Quiz && store.quizzes.Quiz.length === 0
                            ? "No hay Quiz cargados"
                            : store.quizzes && store.quizzes.Quiz && store.quizzes.Quiz.map((item) => (
                                <div className="row w-100" key={item.id}>
                                    <div className="col-12">
                                        <div className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100" style={{ backgroundColor: item.id % 2 === 0 ? '#F0F0F0' : '#C8C8C8' }}>
                                            <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.id}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.questionTitle}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.answerUser}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '50%' }}>
                                                    {item.approved}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.approvalPercentageNumber}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
