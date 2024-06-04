import React, { useState, useContext, useRef } from "react";
import { Context } from '../../store/appContext';
import '../../../styles/components.css'
import { useNavigate } from "react-router-dom"
import { LuHeart } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export const CoursesContainer = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const containerRef = useRef(null); // Referencia al contenedor principal
    const [activeIndex, setActiveIndex] = useState(0); // Estado para el índice activo del carrusel

    function handleAddTrolley(titleCourse, courseId, price) {
        actions.addCourseToTrolley(titleCourse, courseId, price);
    }

    const handleNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: containerRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };

    const handlePrev = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -containerRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="container-fluid position-relative d-flex flex-column justify-content-around align-items-center" style={{ height: "100vh" }}>
            <div className="d-flex align-items-center">
                <h1 className="poppins-extrabold-italic lh-lg fw-light">Don't you know it yet? Learning is fun! Let's have fun together acquiring new knowledge</h1>
            </div>
            <div className="container-fluid position-relative">
                <button className="btnFav d-flex justify-content-center align-items-center position-absolute top-50 start-0 translate-middle-y" onClick={handlePrev} style={{ zIndex: 10 }}>
                    <FaArrowLeft />
                </button>
                <div className="d-flex justify-content-center align-items-center overflow-hidden p-4 scroll-container" ref={containerRef} style={{ whiteSpace: 'nowrap' }}>
                    {store.course && store.course.access_to_courses && store.course.access_to_courses.length === 0 ? (
                        "No hay Cursos Cargados"
                    ) : (
                        store.course && store.course.access_to_courses && store.course.access_to_courses.map((item, index) => {
                            return (
                                <div key={index} className='card border-0 cardEdit shadow rounded-5 text-white bg-dark col-xxl-3 col-xl-3 col-lg-4 col-md-5 col-sm-12 me-3' style={{ width: "20rem" }}>
                                    <div className="card-img-top">
                                        <div className="course-thumbnail">
                                            <img
                                                src={item.titleUrlMedia}
                                                className="img-fluid rounded-top-4"
                                                alt="python-course"
                                                style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                                                onClick={() => navigate(`/course/${item.id}`)}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body rounded-bottom-4 p-3 bg-white">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h3 className="card-title fw-bolder fs-5 text-white">{item.title}</h3>
                                            </div>
                                            <div className="py-2 px-2 border fs-6 rounded-pill d-inline-flex justify-content-center align-items-center btnFav">
                                                <strong>subscribe</strong>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="border rounded-pill fs-6 py-1 px-1 me-3 d-inline-flex letter text-truncate" style={{ maxWidth: '40%', backgroundColor: "rgba(255, 255, 255, 0.5)" }}>{item.categoryTitle}</p>
                                            <p className="border rounded-pill fs-6 py-1 px-1 d-inline-flex letter text-truncate" style={{ right: 0, maxWidth: '40%', backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Modulos: {item.modulesLength}</p>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className='py-2 px-2 border fs-6 rounded-circle d-flex justify-content-center align-items-center btnFav' onClick={() => handleAddTrolley(item.title)}>
                                                <LuHeart size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <button className="btnFav d-flex justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y" onClick={handleNext} style={{ zIndex: 10 }}>
                    <FaArrowRight />
                </button>
            </div>
        </div>

    );
};
