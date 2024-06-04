import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';

import { GrFormPreviousLink } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go"

export const UpdateModule = () => {
    const { actions, store } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('')
    const [isUsers, setIsUsers] = useState(true);
    const [redirectPath, setRedirectPath] = useState('');
    const [counter, setCounter] = useState(7);
    const { modulesId } = useParams();
    const navigate = useNavigate();
    const [moduleData, setmoduleData] = useState(() => {
        const moduleToUpdate = store.module.access_to_modules.find(module => module.id == modulesId)

        if (moduleToUpdate) {
            return {
                title: moduleToUpdate.title,
                descriptionContent: moduleToUpdate.descriptionContent,
                urlVideo: moduleToUpdate.urlVideo,
                videoId: moduleToUpdate.videoId,
                imageId: moduleToUpdate.imageId,
                totalVideo: moduleToUpdate.totalVideo,
                dateCreate: moduleToUpdate.dateCreate,
                tokenModule: moduleToUpdate.tokenModule,
               

            };
        } else {
            return {
                title: '',
                descriptionContent: '',
                urlVideo: '',
                videoId: '',
                imageId: '',
                totalVideo: '',
                dateCreate: '',
            };
        }
    })



    useEffect(() => {
        // Obtener los detalles del usuario específico y establecer los datos en el estado local
        const moduleToUpdate = store.module.access_to_modules.find(module => module.id == modulesId);
        if (moduleToUpdate) {
            setmoduleData({
                title: moduleToUpdate.title,
                descriptionContent: moduleToUpdate.descriptionContent,
                urlVideo: moduleToUpdate.urlVideo,
                videoId: moduleToUpdate.videoId,
                imageId: moduleToUpdate.imageId,
                totalVideo: moduleToUpdate.totalVideo,
                dateCreate: moduleToUpdate.dateCreate,
                tokenModule: moduleToUpdate.tokenModule
            });
        }
    }, [modulesId, store.module.access_to_modules]);

    const handlerChange = e => {
        const { name, value } = e.target;
        setmoduleData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const resetForm = () => {
        setmoduleData({
            title: '',
            descriptionContent: '',
            urlVideo: '',
            videoId: '',
            imageId: '',
            totalVideo: '',
            dateCreate: '',
           
        });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        if (moduleData.name !== '' && moduleData.email !== '' && moduleData.totalVideo !== '' && moduleData.urlVideo !== '' && moduleData.videoId !== '' && moduleData.imageId !== '' && moduleData.dateCreate !== '' && moduleData.tokenModule !== '') {
            await actions.updateModule(moduleData, modulesId);
            resetForm();
        } else {
            alert('You must not leave any field empty.');
        }
    }

    function handlerGoToLogIn() {
        navigate('/LogIn');
    }

    function handlerHome() {
        navigate('/mandateCreaterView');
    }

    useEffect(() => {
        if (redirectPath !== '') {
            navigate(redirectPath);
        }
    }, [navigate, redirectPath]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (msgError === '' && msg2 === '') {
                    return

                } else if (store.error === ''  && counter === 7) {
                    
                    clearInterval(interval)
                }

                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [setRedirectPath, store.error, counter, msg2, msgError]);


    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error)
    const msg2 = typeof store.msg2 === 'string' ? store.msg2 : JSON.stringify(store.msg2)

    return (
        <div className="container mt-4 w-50">
            {/* Msg */}
            <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x'>
                {(msgError === '' && msg2 === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {"Internet or server connection failure"}
                    </div>
                ) : (msgError === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg2}
                    </div>
                ) : (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {msgError}
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-center align-items-center position-relative mt-3 mb-5" style={{ zIndex: 0 }}>
                <div className='d-flex justify-content-center align-items-center mx-2 fs-4 position-absolute start-0'
                    onClick={handlerHome}
                    style={{ cursor: "pointer" }}>
                    <GoArrowLeft />
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <h1>Update Course</h1>
                </div>
            </div>

            <div >
                <form className="px-2" onSubmit={handlerSubmit}>
                    {/* Title */}

                    <div className='col-lg-6'>
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name='title'
                            onChange={handlerChange}
                            value={moduleData.title}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>

                    </div>

                    {/* Category Title */}
                    <div className='col-lg-6'>
                        <label className="form-label">Category Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name='descriptionContent'
                            onChange={handlerChange}
                            value={moduleData.descriptionContent}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>

                    {/* Modules Lenght */}
                    <div className='d-block col-lg-12'>
                        <label className="form-label">Modules Lenght</label>
                        <div className="input-group has-validation">
                            <input
                                type="text"
                                className="form-control"
                                name='urlVideo'
                                onChange={handlerChange}
                                value={moduleData.urlVideo}
                                required />
                        </div>
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    {/* Title Certificate to Get */}
                    <div className='d-block'>
                        <label className="form-label">Title Certificate to Get</label>
                        <input
                            type="text"
                            className="form-control"
                            name='titleCertificateToGe'
                            onChange={handlerChange}
                            value={moduleData.videoId}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    
                    {/* imageId */}
                    <div className='d-block col-lg-4'>
                        <label className="form-label">imageId</label>
                        <input
                            type="totalVideo"
                            className="form-control"
                            name='imageId'
                            onChange={handlerChange}
                            value={moduleData.imageId}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    {/* Description */}
                    <div className='d-block col-lg-3 '>
                        <label className="form-label">Description</label>
                        <textarea
                            type="number"
                            className="form-control"
                            name='description'
                            onChange={handlerChange}
                            value={moduleData.totalVideo}
                            required ></textarea>
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>

                    {/* dateCreate */}
                    <div className='d-block col-lg-4'>
                        <label className="form-label">dateCreate</label>
                        <input
                            type="text"
                            className="form-control"
                            name='dateCreate'
                            onChange={handlerChange}
                            value={moduleData.dateCreate}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                   

                </form>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handlerSubmit} >
                    {
                        (store.spinner)
                            ? <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : <div className="row align-items-center ">
                                <div className="col align-self-center text-center fs-4">
                                    <span>Update Modules</span>
                                </div>
                            </div>
                    }
                </button>
            </div>
        </div>
    );
}




