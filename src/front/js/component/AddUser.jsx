import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

import { Message } from './Message.jsx'

import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";

export const AddUser = () => {
    const { store, actions } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('');
    const [isUsers, setIsUsers] = useState(true);
    const [certificate, setCertificate] = useState('');
    const [userId, setUserId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [counter, setCounter] = useState(7);
    const [redirectPath, setRedirectPath] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        username: '',
        numberDocument: '',
        phone: '',
        age: '',
        gender: ''
    });

    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath);
        }
    }, [redirectPath, navigate]);

    useEffect(() => {
        if (store.error === '' && selectedRole && counter === 7) {
            setRedirectPath(`/${selectedRole}View`);
        }

        const interval = setInterval(() => {
            setCounter(prevCounter => prevCounter + 1);
        }, 500);

        return () => clearInterval(interval);
    }, [store.error, selectedRole, counter]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'isPeople') {
            setSelectedRole(value);
            let updatedData = {};
            if (value === 'user') {
                updatedData = { isUser: isUsers };
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isTeacher: undefined,
                    isManager: undefined,

                }));
            } else if (value === 'teacher') {
                updatedData = { isTeacher: isUsers };
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isManager: undefined,
                    certificateTeacher: certificate,
                }));
            } else if (value === 'manager') {
                updatedData = { isManager: isUsers };
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isTeacher: undefined
                }));
            }
        } else if (name === 'userId' || name === 'teacherId') {
            if (name === 'userId') setUserId(value);
            if (name === 'teacherId') setTeacherId(value);

            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.createUser(userData, selectedRole);
        setCounter(0);
    };

    const handlerGoToLogIn = () => {
        navigate('/LogIn');
    };

    const handlerHome = () => {
        navigate('/');
    };

    
    

    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg);

    return (
        <div className='container position-relative'>
            {/* Mostrar mensaje de éxito o error */}
            {msgError && <Message type="danger" text={msgError} />}
            {msg && <Message type="success" text={msg} />}

            <div className="d-flex justify-content-center align-items-center position-relative mt-3 mb-5" style={{ zIndex: 0 }}>
                <div className='d-flex justify-content-center align-items-center mx-2 fs-4 position-absolute start-0'
                    onClick={handlerHome}
                    style={{ cursor: "pointer" }}>
                    <GoArrowLeft />
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <h1>Record your Personal Data</h1>
                </div>
            </div>

            <form className=" mt-5 mb-5 row g-3 was-validated" onSubmit={handleSubmit} noValidate>
                <div className='col-12'>
                    <label className="form-label">Role</label>
                    <div className="input-group has-validation">
                        <select className="form-select" name='isPeople' onChange={handleChange} value={selectedRole} required>
                            <option value="">--Choose--</option>
                            <option value='teacher'>Teacher</option>
                            <option value='user'>Student</option>
                            <option value='manager'>Manager</option>
                        </select>
                    </div>
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className='col-lg-6'>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        onChange={handleChange}
                        value={userData.name}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className='col-lg-6'>
                    <label className="form-label">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='lastName'
                        onChange={handleChange}
                        value={userData.lastName}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className={`${(selectedRole === 'teacher' || selectedRole === 'user') ? 'd-block col-lg-12' : 'd-none'}`}>
                    <label className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <input
                            type="text"
                            className="form-control"
                            name='username'
                            onChange={handleChange}
                            value={userData.username}
                            required />
                    </div>
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className={`col-lg-3 ${(selectedRole === 'manager') ? 'd-block' : 'd-block'}`}>
                    <label className="form-label">Number Document</label>
                    <input
                        type="number"
                        className="form-control"
                        name='numberDocument'
                        onChange={handleChange}
                        value={userData.numberDocument}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className={`col-lg-3 ${(selectedRole === 'manager') ? 'd-none' : 'd-block col-lg-3'}`}>
                    <label className="form-label">Gender</label>
                    <select className="form-select" name='gender' onChange={handleChange} value={userData.gender} required>
                        <option value="">--Choose--</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className={`${(selectedRole === 'manager') ? 'd-block col-lg-4' : 'd-block col-lg-3'}`}>
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name='phone'
                        onChange={handleChange}
                        value={userData.phone}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className={`${(selectedRole === 'manager') ? 'd-none' : 'd-block col-lg-3 '}`}>
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        name='age'
                        onChange={handleChange}
                        value={userData.age}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className={`${(selectedRole === 'teacher') ? 'd-block col-lg-12' : 'd-none'}`}>
                    <label className="form-label">Do you have a Certificate?</label>
                    <input
                        type="text"
                        className="form-control"
                        name='certificateTeacher'
                        onChange={(eve) => { setCertificate(eve.target.value) }}
                        value={certificate}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <div className={`${(selectedRole === 'manager') ? 'd-block col-lg-4' : 'col-lg-6 '}`}>
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        onChange={handleChange}
                        value={userData.email}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className={`${(selectedRole === 'manager') ? 'd-block col-lg-4' : 'col-lg-6'}`}>
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name='password'
                        onChange={handleChange}
                        value={userData.password}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}>
                    {
                        (store.spinner)
                            ? <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : <div className="row align-items-center ">
                                <div className="col align-self-center text-center fs-4">
                                    <span>Create User</span>
                                </div>
                            </div>
                    }
                </button>
                <div className='col-lg my-3 text-center text-decoration-underline' style={{ cursor: "pointer" }}>
                    <a onClick={handlerGoToLogIn}>You already have an account.</a>
                </div>
            </form>
        </div>
    );
};
