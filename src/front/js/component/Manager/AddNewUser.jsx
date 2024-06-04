import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext.js';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go"

export const AddNewUser = () => {
    const { store, actions } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('');
    const [isUsers, setIsUsers] = useState(true);
    const [certificate, setCertificate] = useState('');
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
                    isManager: undefined
                }));
            } else if (value === 'teacher') {
                updatedData = { isTeacher: isUsers };
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isManager: undefined,
                    certificateTeacher: certificate
                }));
            } 
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        await actions.createUser(userData, selectedRole);
        setCounter(0)
    }

    function handlerGoToLogIn() {
        navigate('/LogIn');
    }

    function handlerHome() {
        navigate('/');
    }

    useEffect(() => {
        if (redirectPath !== '') {
            navigate(redirectPath);
        }
    }, [navigate, redirectPath]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (msgError === '' && msg === ''){
                    return
                      
                }else if(store.error === '' && selectedRole !== '' && counter === 7){
                    /* setRedirectPath(`/${selectedRole}View`) */
                    clearInterval(interval)
                }
                
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [setRedirectPath, store.error, counter]);


    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error)
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg)
    console.log(msg, msgError)
    return (
        <div className='container'>
            {/* Msg */}
            <div className='position-relative'>
                <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x' style={{ zIndex: 1 }}>
                    {(msgError === '' && msg === '') ? (
                        <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                            {"Internet or server connection failure"}
                        </div>
                    ) : (msgError === '') ? (
                        <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                            {msg}
                        </div>
                    ) : (
                        <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                            {msgError}
                        </div>
                    )}
                </div>
            </div>

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

                {/* Role */}
                <div className='col-12'>
                    <label className="form-label">Role</label>
                    <div className="input-group has-validation">
                        <select className="form-select" name='isPeople' onChange={handleChange} value={selectedRole} required>
                            <option value="">--Choose--</option>
                            <option value='teacher'>Teacher</option>
                            <option value='user'>Student</option>
                            {/* <option value='manager'>Manager</option> */}
                        </select>
                    </div>
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                {/* Name */}
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
                {/* Last Name */}
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
                {/* Username */}
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
                {/* Number Document */}
                <div className={`col-lg-3 ${(selectedRole === 'manager') ? 'd-block' : 'd-block'}`}>
                    <label className="form-label">Number Document</label>
                    <input
                        type="text"
                        className="form-control"
                        name='numberDocument'
                        onChange={handleChange}
                        value={userData.numberDocument}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                {/* Gender */}
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
                {/* Phone */}
                <div className={`${(selectedRole === 'manager') ? 'd-block col-lg-4' : 'd-block col-lg-3'}`}>
                    <label className="form-label">Phone</label>
                    <input
                        type="phone"
                        className="form-control"
                        name='phone'
                        onChange={handleChange}
                        value={userData.phone}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                {/* Age */}
                <div className={`${(selectedRole === 'manager') ? 'd-none' : 'd-block col-lg-3 '}`}>
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        name='age'
                        onChange={handleChange}
                        value={userData.age}
                        required />
                    <div className="invalid-feedback">
                        Please enter your information.
                    </div>
                </div>
                {/* Certificate */}
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
                {/* Email */}
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
                {/* Password */}
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
                    onClick={()=>{
                        handleSubmit()
                        actions.getUser()
                    }}>
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
