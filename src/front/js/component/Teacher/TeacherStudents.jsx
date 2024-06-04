import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../store/appContext'
import { AddNewUser } from '../Manager/AddNewUser.jsx';


export const TeacherStudents = () => {
    const { store, actions } = useContext(Context);

    const [active, setActive] = useState(false);

    const navigate = useNavigate();

    const handleUpdateUser = (userId) => {
        navigate(`/userUpdate/${userId}`);
    };

    const deleteUser = (userId) => {
        actions.deleteUser(userId);
    };

    const toggleActive = () => {
        setActive(!active);
    };

    console.log(store.user.access_to_user);

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
                    <div>
                        {store.user.access_to_user.length === 0 ? (
                            "there are no registered students"
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
                                        <th scope="col">EDIT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.user.access_to_user.map((item, index) => (
                                        <tr key={item.id || index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.numberDocument}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.username}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                                <button onClick={() => handleUpdateUser(item.id)}>Edit</button>
                                                <button onClick={() => deleteUser(item.id)}>Del</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <button onClick={toggleActive}>Add</button>
                    <div className={`${active ? "d-block" : "d-none"}`}>
                        <AddNewUser />
                    </div>
                </div>
            )}
        </div>
    );
}
