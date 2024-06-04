import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';

import { GrFormPreviousLink } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go"


export const UpdateCourse = () => {
    const { actions, store } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('')
    const [isUsers, setIsUsers] = useState(true);
    const [redirectPath, setRedirectPath] = useState('');
    const [counter, setCounter] = useState(7);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(() => {
        const courseToUpdate = store.course.access_to_courses.find(course => course.id == courseId)

        if (courseToUpdate) {
            return {
                title: courseToUpdate.title,
                categoryTitle: courseToUpdate.categoryTitle,
                modulesLength: courseToUpdate.modulesLength,
                titleCertificateToGet: courseToUpdate.titleCertificateToGet,
                price: courseToUpdate.price,
                descripton: courseToUpdate.descripton,
                assessment: courseToUpdate.assessment,
                titleTeacher: courseToUpdate.titleTeacher,
                createDate: courseToUpdate.createDate,
                dateExpiration: courseToUpdate.dateExpiration

            };
        } else {
            return {
                title: '',
                categoryTitle: '',
                modulesLength: '',
                titleCertificateToGet: '',
                price: '',
                description: '',
                assessment: '',
                titleTeacher: '',
                createDate: '',
                dateExpiration: ''
            };
        }
    })



    useEffect(() => {
        // Obtener los detalles del usuario específico y establecer los datos en el estado local
        const courseToUpdate = store.course.access_to_courses.find(course => course.id === courseId);
        if (courseToUpdate) {
            setCourseData({
                email: courseToUpdate.email,
                name: courseToUpdate.name,
                lastName: courseToUpdate.lastName,
                username: courseToUpdate.username,
                numberDocument: courseToUpdate.numberDocument,
                phone: courseToUpdate.phone,
                age: courseToUpdate.age,
                gender: courseToUpdate.gender
            });
        }
    }, [courseId, store.course.access_to_courses]);

    const handlerChange = e => {
        const { name, value } = e.target;
        setCourseData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const resetForm = () => {
        setCourseData({
            title: '',
            categoryTitle: '',
            modulesLength: '',
            titleCertificateToGet: '',
            price: '',
            description: '',
            assessment: '',
            titleTeacher: '',
            dateExpiration: ''
        });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        if (courseData.name !== '' && courseData.email !== '' && courseData.phone !== '' && courseData.lastName !== '' && courseData.username !== '' && courseData.numberDocument !== '' && courseData.age !== '' && courseData.gender !== '') {
            await actions.updateCourse(courseData, courseId);
            resetForm();
        } else {
            alert('You must not leave any field empty.');
        }
    }

    function handlerGoToLogIn() {
        navigate('/LogIn');
    }

    function handlerHome() {
        navigate('/managerView');
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

                } else if (store.error === '' && counter === 7) {

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
                            value={courseData.title}
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
                            name='categoryTitle'
                            onChange={handlerChange}
                            value={courseData.categoryTitle}
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
                                name='modulesLength'
                                onChange={handlerChange}
                                value={courseData.modulesLength}
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
                            value={courseData.titleCertificateToGet}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>

                    {/* Price */}
                    <div className='d-block col-lg-4'>
                        <label className="form-label">Price</label>
                        <input
                            type="phone"
                            className="form-control"
                            name='price'
                            onChange={handlerChange}
                            value={courseData.price}
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
                            value={courseData.description}
                            required ></textarea>
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>

                    {/* Assessment */}
                    <div className='d-block col-lg-4'>
                        <label className="form-label">Assessment</label>
                        <input
                            type="text"
                            className="form-control"
                            name='assessment'
                            onChange={handlerChange}
                            value={courseData.assessment}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>

                    {/* Title Teacher */}
                    <div className='d-block col-lg-4'>
                        <label className="form-label">Title Teacher</label>
                        <input
                            type="text"
                            className="form-control"
                            name='titleTeacher'
                            onChange={handlerChange}
                            value={courseData.titleTeacher}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>

                    {/* Date Expiration */}
                    <div className='d-block col-lg-4'>
                        <label className="form-label">Date Expiration</label>
                        <input
                            type="date"
                            className="form-control"
                            name='dateExpiration'
                            onChange={handlerChange}
                            value={courseData.dateExpiration}
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
                                    <span>Update User</span>
                                </div>
                            </div>
                    }
                </button>
            </div>
        </div>
    );
}




