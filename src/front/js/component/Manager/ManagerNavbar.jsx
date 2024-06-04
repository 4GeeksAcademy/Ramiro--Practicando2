
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext';

import { Message } from '../Message.jsx'

export const ManagerNavbar = () => {
    const { store, actions } = useContext(Context);
    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Estado para controlar la visualización del spinner

    useEffect(() => {
        // Cambiar el estado del spinner
        setLoading(store.spinner);
    }, [store.spinner]);

    function handleGoToTrolley() {
        navigate('/Trolley');
    }

    function handleHome() {
        navigate('/');
    }

    const handleMouseEnter = () => {
        setHovered(true)
        console.log(hovered => hovered + 1)
    }

    const handleMouseLeave = () => {
        setHovered(false)
    }

    function handleHomeView() {
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('userToLogin')

        navigate('/SignOut');
    }

    function handleHome() {
        navigate('/')
    }
    
    const accessToAddCourse = Array.isArray(store.courseFavorite) ? store.courseFavorite : [];

    return (
        <div className="position-relative">
            {/* Mostrar mensaje de éxito o error */}
            {msgError && <Message type="danger" text={msgError} />}
            {msg && <Message type="success" text={msg} />}

            {loading && ( // Renderizar el spinner si está en estado de carga
                <div className="spinner-overlay d-flex justify-content-center align-items-center">
                    <div className="spinner-overlay d-flex justify-content-center align-items-center">
                        <img className="spinner-image" src="http://res.cloudinary.com/dfoegvmld/image/upload/v1717432190/k08lvmnyqvccpqiyr001.png" alt="spinner" style={{ width: '130px' }} />
                    </div>
                </div>
            )}
            {localStorage.getItem('jwt-token') ? (
                <nav className="navbar navbar-light bg-white navbar-expand-lg">
                    <div className="container-fluid">
                        <div className='d-flex'>
                            <div className="col-3">
                                <img src="https://res.cloudinary.com/dfoegvmld/image/upload/v1717377021/i6uvyydr1sapaurgp3r5.png"
                                    alt="logo_alta_elearning" className='w-100' onClick={handleHome} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className="d-flex justify-content-center mx-3">
                                <button className="btn btn-white d-flex align-items-center btnFav" type="button" data-bs-toggle="collapse" data-bs-target="#coursesCategories" aria-expanded="false" aria-controls="coursesCategories" onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
                                    Categories
                                </button>
                            </div>
                            <div className="position-relative">
                                <div className="collapse position-absolute top-0 start-0" style={{ marginLeft: '10%', zIndex: 1050 }} id="coursesCategories">
                                    <div className="card card-body">
                                        {store.category && store.category.length > 0 ? (
                                            store.category?.map((item, index) => {
                                                return (
                                                    <a type="text" className="d-block mb-2" onClick={() => navigate(`/category/${item.titleCategory}`)} key={index}>{item.titleCategory}</a>
                                                )
                                            })
                                        ) : (
                                            <a type="text" className="d-block mb-2 text-decoration-none letter">No category available</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarContent">
                            
                            
                           {/*  <div className="dropdown">
                                <button
                                    type="button"
                                    className="btnFav dropdown-toggle text-center mx-2 px-3 py-2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-bs-auto-close="true"
                                >
                                    <i className="fa-solid fa-cart-shopping fa-fade" style={{ color: "#165D95" }}></i>
                                    Trolley <span className={`badge text-bg-${accessToAddCourse.length === 0 ? 'secondary' : 'danger'}`}>{accessToAddCourse.length}</span>
                                </button>
                                <div>
                                    {
                                        accessToAddCourse.length === 0
                                            ? <p className='letter'>Not course in Trolley</p>
                                            : (
                                                <ul className="dropdown-menu">
                                                    {accessToAddCourse.map((trolley, index) => (
                                                        <li key={index}
                                                            className="list-group-item"
                                                        >{trolley.titleCourse} / {trolley.price} / {trolley.date}</li>
                                                    ))}
                                                    <button onClick={handleGoToTrolley}>More</button>
                                                </ul>
                                            )
                                    }
                                </div>

                            </div> */}
                            <button
                                type="button"
                                className="btnFav text-center mx-2 px-3 py-2"
                                onClick={handleHomeView}
                            >
                                Sign Out
                            </button>
                            <div className='border border-warning rounded-pill px-2 py-1 fs-6'>
                                <span className='text-warning'>{store.currentRole}</span>
                            </div>
                        </div>
                    </div>
                </nav>
            ) : (
                <div>Not Data</div>
            )}
        </div>
    );
};

