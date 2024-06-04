import React, { useState, useContext, useRef } from "react";
import { Context } from '../store/appContext';
import '../../styles/components.css';
import { useNavigate } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 

export const Category = () => {
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

    const accessToCategory = store?.category?.category

  return (
    <div>
         <div className="container-fluid position-relative">
            <button className="btnFav d-flex justify-content-center align-items-center position-absolute top-50 start-0 translate-middle-y" onClick={handlePrev} style={{ zIndex: 10 }}>
                <FaArrowLeft />
            </button>
            <div className="d-flex justify-content-center align-items-center overflow-hidden p-4 scroll-container" ref={containerRef} style={{ whiteSpace: 'nowrap' }}>
                {accessToCategory && accessToCategory.length === 0
                            ? (
                    "Not Category"
                ) : (
                  accessToCategory?.map((item, index) => {
                        return (
                            <div key={index} className='card border-0 shadow rounded-5 text-white bg-dark col-xxl-3 col-xl-3 col-lg-4 col-md-5 col-sm-12 me-3' style={{width: "20rem"}}>
                                
                                <div className="card-body rounded-bottom-4 p-3 position-relative" style={{
                                    backgroundColor: (item.id % 5 === 0) ? "#18BEBE" :
                                        (item.id % 4 === 0) ? "#3A6F99" :
                                            (item.id % 3 === 0) ? "#F6CA1F" :
                                                (item.id % 2 === 0) ? "#139895" :
                                                    "#165D95"
                                }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 className="card-title fw-bolder fs-5 text-white">{item.subCategory}</h3>
                                        </div>
                                        <div className="py-2 px-2 border fs-6 rounded-pill d-inline-flex justify-content-center align-items-center btnFav" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                                            <strong>subscribe</strong>
                                        </div>
                                    </div>
                                    <p className="border rounded-pill py-1 px-1 me-3 d-inline-flex letter text-truncate" style={{ maxWidth: '70%', backgroundColor: "rgba(255, 255, 255, 0.5)" }}>{item.titleCategory}</p>
                                    <p className="border rounded-pill py-1 px-1 d-inline-flex z-3 position-absolute letter text-truncate" style={{ right: 0, maxWidth: '70%', backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Modulos: {item.modulesLength}</p>
                                    <div className="d-flex justify-content-end">
                                        <button className='py-2 px-2 border fs-6 rounded-circle d-flex justify-content-center align-items-center btnFav' onClick={() => handleAddTrolley(item.title, item.id, item.price)} style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
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
  )
}
