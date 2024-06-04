import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { GrFormPreviousLink } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";

export const UpdateUser = (Role) => {
    const { actions, store } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('');
    const [isUsers, setIsUsers] = useState(true);
    const [redirectPath, setRedirectPath] = useState('');
    const [certificate, setCertificate] = useState('');
    const [userData, setUserData] = useState({});
    const { userId } = useParams();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(7);

    useEffect(() => {
        const userToUpdate = store.user.access_to_teacher.find(user => user.id === parseInt(userId)) || store.user.access_to_user.find(user => user.id === parseInt(userId)) || store.user.access_to_manager.find(user => user.id === parseInt(userId));
        if (userToUpdate) {
            setUserData({
                email: userToUpdate.email,
                name: userToUpdate.name,
                lastName: userToUpdate.lastName,
                username: userToUpdate.username,
                numberDocument: userToUpdate.numberDocument,
                phone: userToUpdate.phone,
                age: userToUpdate.age,
                gender: userToUpdate.gender,
                certificateTeacher: userToUpdate.certificateTeacher || ''
            });
            setSelectedRole(userToUpdate.isTeacher ? 'teacher' : userToUpdate.isUser ? 'user' : 'manager');
        }
    }, [userId, store.user.access_to_user, store.user.access_to_teacher, store.user.access_to_manager]);

    const handlerChange = e => {
        const { name, value } = e.target;
        if (name === 'isPeople') {
            setSelectedRole(value);
            if (value === 'teacher') {
                setCertificate(userData.certificateTeacher || '');
            } else {
                setCertificate('');
            }

            let updatedData = {};
            if (value === 'user') {
                updatedData = { isUser: true, isTeacher: undefined, isManager: undefined, certificateTeacher: '' };
            } else if (value === 'teacher') {
                updatedData = { isTeacher: true, isUser: undefined, isManager: undefined };
            } else if (value === 'manager') {
                updatedData = { isManager: true, isUser: undefined, isTeacher: undefined, certificateTeacher: '' };
            }
            setUserData(prevState => ({
                ...prevState,
                ...updatedData
            }));
        } else if (name === 'certificateTeacher') {
            setCertificate(value);
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

    const handleSubmit = async event => {
        event.preventDefault();
        if (userData.name !== '' && userData.email !== '' && userData.phone !== '' && userData.lastName !== '' && userData.numberDocument !== '') {
            await actions.updateUser(userData, selectedRole, userId);
            setCounter(0);
            resetForm();
        } else {
            alert('You must not leave any field empty.');
        }
    };

    const resetForm = () => {
        setUserData({
            email: '',
            name: '',
            lastName: '',
            username: '',
            numberDocument: '',
            phone: '',
            age: '',
            gender: '',
            certificateTeacher: ''
        });
        setSelectedRole('');
        setCertificate('');
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (store.error === '' && store.msg2 !== '' && prevCounter === 0) {
                    setTimeout(() => {
                        setRedirectPath(`/${selectedRole}View`)
                    }, 5000);
                }
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [navigate, store.error, store.msg2]);

    /* const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg2 = typeof store.msg2 === 'string' ? store.msg2 : JSON.stringify(store.msg2); */
    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg);

    return (
        <div className="container mt-4 w-50">
            {/* Mostrar mensaje de éxito o error */}
            {msgError && <Message type="danger" text={msgError} />}
            {msg && <Message type="success" text={msg} />}

            <h1>Update</h1>
            <div >
                <form className="px-2" onSubmit={handleSubmit}>
                    {/* Role */}
                    <div className='col-12'>
                        <label className="form-label">Role</label>
                        <div className="input-group has-validation">
                            <select className="form-select" name='isPeople' onChange={handlerChange} value={selectedRole} required>
                                <option value="">--Choose--</option>
                                <option value='user'>Student</option>
                                <option value='teacher'>Teacher</option>
                                <option value='manager'>Manager</option>
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
                            onChange={handlerChange}
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
                            onChange={handlerChange}
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
                                onChange={handlerChange}
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
                            onChange={handlerChange}
                            value={userData.numberDocument}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    {/* Gender */}
                    <div className={`col-lg-3 ${(selectedRole === 'manager') ? 'd-none' : 'd-block col-lg-3'}`}>
                        <label className="form-label">Gender</label>
                        <select className="form-select" name='gender' onChange={handlerChange} value={userData.gender} required>
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
                            onChange={handlerChange}
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
                            onChange={handlerChange}
                            value={userData.age}
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
                            onChange={handlerChange}
                            value={userData.email}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    {/* Certificate */}
                    <div className={`${(selectedRole === 'teacher') ? 'd-block col-lg-12' : 'd-none'}`}>
                        <label className="form-label">Do you have a Certificate?</label>
                        <input
                            type="text"
                            className="form-control"
                            name='certificateTeacher'
                            onChange={handlerChange}
                            value={certificate}
                            required={selectedRole === 'teacher'}
                        />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        {store.spinner ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <div className="row align-items-center ">
                                <div className="col align-self-center text-center fs-4">
                                    <span>Update User</span>
                                </div>
                            </div>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
