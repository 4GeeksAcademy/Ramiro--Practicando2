import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext';

export const ManagerProfile = () => {
    const { store, actions } = useContext(Context);
    const [changeId, setChangeId] = useState("");
    const navigate = useNavigate();

    const handleUpdateUser = (userId) => {
        navigate(`/userUpdate/${userId}`);
    };


    if (!store.user || !store.user.access_to_user) {
        return <div>Loading user data...</div>;
    }

    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));

    return (
        <div className="user-profile-container d-flex justify-content-center">
            <div className='my-3'>

                <ul className="list-group d-flex flex-row">
                    <div className="d-flex flex-column">
                        <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                            Name
                        </li>
                        <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                            Last Name
                        </li>
                        <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                            Email
                        </li>
                        <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                            Number Document
                        </li>
                        <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                            Phone
                        </li>
                        <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher') ? 'd-block list-group-item' : 'd-none'}`}>
                            Username
                        </li>
                        <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher') ? 'd-block list-group-item' : 'd-none'}`}>
                            Gender
                        </li>
                        <li className={`${store.currentRole === 'teacher' ? 'd-block list-group-item' : 'd-none'}`}>
                            Certificate
                        </li>
                    </div>
                    <div className="d-flex flex-column">
                        {store.user[`access_to_${store.currentRole}`].map((item, index) => (
                            item.email === userToLogin.email && (
                                <React.Fragment key={item.id || index}>
                                    <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.name ? item.name : "No Data Recorded"}
                                    </li>
                                    <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.lastName ? item.lastName : "No Data Recorded"}
                                    </li>
                                    <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.email ? item.email : "No Data Recorded"}
                                    </li>
                                    <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.numberDocument ? item.numberDocument : "No Data Recorded"}
                                    </li>
                                    <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.phone ? item.phone : "No Data Recorded"}
                                    </li>
                                    <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher') ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.username ? item.username : "No Data Recorded"}
                                    </li>
                                    <li className={`${(store.currentRole === 'user' || store.currentRole === 'teacher') ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.gender ? item.gender : "No Data Recorded"}
                                    </li>
                                    <li className={`${store.currentRole === 'teacher' ? 'd-block list-group-item' : 'd-none'}`}>
                                        {item.certificateTeacher ? item.certificateTeacher : "No Data Recorded"}
                                    </li>
                                    <div className='d-flex justify-content-center my-2'>
                                        <button className='btnFav w-75 text-center mx-2 px-3 py-2' onClick={() => handleUpdateUser(item.id)}>Edit</button>
                                    </div>
                                </React.Fragment>
                            )
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};
