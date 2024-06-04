import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export const UpdateTeacher = () => {
    const { actions, store } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('');
    const [certificate, setCertificate] = useState('');
    const [teacherData, setTeacherData] = useState({});
    const { teacherId } = useParams();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(7);

    useEffect(() => {
        const teacherToUpdate = store.user.access_to_teacher.find(teacher => teacher.id === parseInt(teacherId));
        if (teacherToUpdate) {
            setTeacherData({
                email: teacherToUpdate.email,
                name: teacherToUpdate.name,
                lastName: teacherToUpdate.lastName,
                username: teacherToUpdate.username,
                numberDocument: teacherToUpdate.numberDocument,
                phone: teacherToUpdate.phone,
                age: teacherToUpdate.age,
                gender: teacherToUpdate.gender,
                certificateTeacher: teacherToUpdate.certificateTeacher
            })
        } else {
            return {
                email: '',
                name: '',
                lastName: '',
                username: '',
                numberDocument: '',
                phone: '',
                age: '',
                gender: '',
                certificateTeacher: ''
            };
        }
    }, [userId, store.user.access_to_teacher]);

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'isPeople') {
            setSelectedRole(value);
            let updatedData = {};
            if (value === 'user') {
                updatedData = { isUser: true };
                setTeacherData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isTeacher: undefined,
                    isManager: undefined
                }));
            } else if (value === 'teacher') {
                updatedData = { isTeacher: true };
                setTeacherData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isManager: undefined,
                    certificateTeacher: certificate
                }));
            } else if (value === 'manager') {
                updatedData = { isManager: true };
                setTeacherData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isManager: undefined
                }));
            }
        } else {
            setTeacherData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (teacherData.name !== '' && teacherData.email !== '' && teacherData.phone !== '' && teacherData.lastName !== '' && teacherData.username !== '' && teacherData.numberDocument !== '' && teacherData.age !== '' && teacherData.gender !== '') {
            await actions.updateUser(teacherData, selectedRole, teacherId);
            setCounter(0);
        } else {
            alert('You must not leave any field empty.');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (store.error === '' && store.msg2 !== '' && prevCounter === 0) {
                    setTimeout(() => {
                        setRedirectPath(`/${store.currentRole}View`)
                    }, 5000);
                }
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [navigate, store.error, store.msg2]);

    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg2 = typeof store.msg2 === 'string' ? store.msg2 : JSON.stringify(store.msg2);

    return (
        <div className="container mt-4 w-50">
            <button
          className="btnFav d-flex justify-content-center align-items-center top-50 end-0 translate-middle-y ms-3 mt-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
          onClick={() => navigate(`/`)}
        >
           <FaArrowLeft />
        </button>
            <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x'>
                {msgError === '' && msg2 === '' ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {"Internet or server connection failure"}
                    </div>
                ) : msgError === '' ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg2}
                    </div>
                ) : (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {msgError}
                    </div>
                )}
            </div>

            <h1>Update</h1>
            <div>
                <form className="px-2" onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label className="form-label">Role</label>
                        <div className="input-group has-validation">
                            <select className="form-select" name='isPeople' onChange={handleChange} value={selectedRole} required>
                                <option value="">--Choose--</option>
                                <option value='teacher'>Teacher</option>
                                {/* <option value='user'>Student</option> */}
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
                            value={teacherData.name}
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
                            value={teacherData.lastName}
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
                                value={teacherData.username}
                                required />
                        </div>
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div className={`col-lg-3 ${(selectedRole === 'manager') ? 'd-block' : 'd-block'}`}>
                        <label className="form-label">Number Document</label>
                        <input
                            type="text"
                            className="form-control"
                            name='numberDocument'
                            onChange={handleChange}
                            value={teacherData.numberDocument}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div className={`col-lg-3 ${(selectedRole === 'manager') ? 'd-none' : 'd-block col-lg-3'}`}>
                        <label className="form-label">Gender</label>
                        <select className="form-select" name='gender' onChange={handleChange} value={teacherData.gender} required>
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
                            type="phone"
                            className="form-control"
                            name='phone'
                            onChange={handleChange}
                            value={teacherData.phone}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div className={`${(selectedRole === 'manager') ? 'd-none' : 'd-block col-lg-3 '}`}>
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            name='age'
                            onChange={handleChange}
                            value={teacherData.age}
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
                            value={teacherData.email}
                            required />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                        <div className="form-text">We'll never share your email with anyone else.</div>
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
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}>
                        {store.spinner
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
                </form>
            </div>
        </div>
    );
};

