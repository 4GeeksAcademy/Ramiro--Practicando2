import React, { useState, useContext } from 'react';
import { Context } from '../../store/appContext';

import { AddUser } from '../AddUser.jsx'
import { useNavigate } from 'react-router-dom';
import { UpdateUser } from './UpdateUser.jsx';

export const Teachers = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const [rol, setRol] = useState("teacher");

    const handleUpdateTeacher = (teacherId) => {
        navigate(`/userUpdate/${teacherId}`)
    };

    const deleteTeacher = (rol, teacherId) => {
        actions.deleteUser(rol, teacherId);
    };

    const toggleActive = () => {
        setActive(!active);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center p-4">
            {store.spinner ? (
                <div className="d-flex justify-content-center">
                    <div>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-center">Loading...</p>
                    </div>
                </div>
            ) : (
                <div className='border border-primary rounded mx-5 my-2 py-3 px-3 text-center'>
                    {store.user.access_to_teacher.length === 0 ? (
                        "No hay Teachers Registrados"
                    ) : (
                        <table className="table mx-auto">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Number Document</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Certificate</th>
                                    <th scope="col">EDIT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.user.access_to_teacher.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.numberDocument}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.username}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.certificateTeacher}</td>
                                        <td>
                                            <button onClick={() => handleUpdateTeacher(item.id, )}>Edit</button>
                                            <button onClick={() => deleteTeacher(rol, item.id)}>Del</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <button onClick={toggleActive}>Add</button>
                    <div className={`${active ? "d-block" : "d-none"}`}>
                        <AddUser />
                    </div>
                </div>
            )}
        </div>
    );
};
