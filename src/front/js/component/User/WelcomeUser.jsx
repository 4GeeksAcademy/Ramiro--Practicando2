import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../store/appContext.js";

import { FaUniversity } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";


export const WelcomeUser = () => {
    const { store, actions } = useContext(Context);
    const [active, setActive] = useState(false);

    useEffect(()=>{
        actions.getCourse()
        actions.getPayments()
    },[])

    const toggleActive = () => {
        setActive(!active);
    }; 

    // Verificar si store.course y store.course.access_to_course existen
    const accessToCourse = store.course?.access_to_course
    const accessToPayment = store.payment?.payment

    return (
        <div className="container-fluid" style={{ position: "relative", textAlign: "center", height: "100vh", padding: 0, margin: 0 }}>
    
            <div>
                <img src="https://media.licdn.com/dms/image/D4D12AQFAm-bJ8YZRNQ/article-cover_image-shrink_720_1280/0/1658653581725?e=2147483647&v=beta&t=suMPUJnAI7EG2IgsJ4F7fcisAMbvVRXeJlKXJhDbF7Y" className="img-fluid opacity-50" alt="Manager" style={{ height: "50vh", width: "100%", objectFit: "cover" }} />
            </div>
            
            <div className='text-black fw-bolder rounded-pill' style={{ position: "absolute", top: "20%", width: "100%",  color: "white" }}>
    
                <h1 className='fs-1 fw-bolder'>Welcome, Student!</h1>
    
                <h5>There is nothing better than learning and improving every day...</h5>
            </div>
            <div className="container-fluid">
                <div className='row d-flex justify-content-center'>
                    <div className="col-5 border rounded-4 my-3 mx-3 px-2 py-2 d-flex flex-column align-items-center">
                        {/* Title*/}
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='p-3 mx-3 border rounded-circle d-flex justify-content-center align-items-center'>
                                <BsFillPersonLinesFill />
                            </div>
                            <div>
                                <h3>Payment Information</h3>
                            </div>
                        </div>
    
                        <div className="row w-100">
                            <div className="col-12">
                                <div
                                    className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                    style={{
                                        backgroundColor: '#AAAAAA'
                                    }}
                                >
                                    <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            #
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Date
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Title Course
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Pad Amount
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Type Payment
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Course Selected
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Operator
                                        </a>
    
                                    </div>
                                </div>
                            </div>
                        </div>

                        {accessToPayment && accessToPayment.length === 0
                            ? "No hay payment cargados"
                            : accessToPayment?.map((item) => (
                                <div className="row w-100" key={item.id}>
                                    <div className="col-12">
                                        <div
                                            className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                            style={{
                                                backgroundColor: item.id % 2 === 0 ? '#F0F0F0' : '#C8C8C8'
                                            }}
                                        >
                                            <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.id}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.date}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.titleCourse}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '50%' }}>
                                                    {item.padAmount}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.typePayment}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.courseId}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.userId}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="col-5 border rounded-4 my-3 mx-3 px-2 py-2 d-flex flex-column align-items-center">
                        {/* Title */}
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='p-3 mx-3 border rounded-circle d-flex justify-content-center align-items-center'>
                                <FaUniversity />
                            </div>
                            <div>
                                <h3>Course Selected</h3>
                            </div>
                        </div>
    
                        <div className="row w-100">
                            <div className="col-12">
                                <div
                                    className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                    style={{
                                        backgroundColor: '#AAAAAA'
                                    }}
                                >
                                    <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            #
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Date
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Title Course
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Pad Amount
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Type Payment
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Course Selected
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                            Operator
                                        </a>
    
                                    </div>
                                </div>
                            </div>
                        </div>

                        {accessToCourse && accessToCourse.length === ''
                            ? "No hay course cargados"
                            : accessToCourse?.map((item) => (
                                <div className="row w-100" key={item.id}>
                                    <div className="col-12">
                                        <div
                                            className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                            style={{
                                                backgroundColor: item.id % 2 === 0 ? '#F0F0F0' : '#C8C8C8'
                                            }}
                                        >
                                            <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflow: 'auto' }}>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.id}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.date}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.titleCourse}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '50%' }}>
                                                    {item.padAmount}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.typePayment}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.courseId}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%', maxHeight: "450px" }}>
                                                    {item.userId}
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




