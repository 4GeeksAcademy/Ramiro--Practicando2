import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext';

export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleUpdateUser = (userId) => {
        navigate(`/userUpdate/${userId}`);
    };

    if (!store.user || !store.user.access_to_user) {
        return <div>Loading user data...</div>;
    }

    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));

    return (
        <div className="user-profile-container">
            <table className="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">Field</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {store.user[`access_to_${store.currentRole}`].map((item, index) => (
                        item.email === userToLogin.email && (
                            <React.Fragment key={item.id || index}>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">ID</th>
                                    <td>{item.id}</td>
                                </tr>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Name</th>
                                    <td>{item.name}</td>
                                </tr>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Last Name</th>
                                    <td>{item.lastName}</td>
                                </tr>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Email</th>
                                    <td>{item.email}</td>
                                </tr>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Number Document</th>
                                    <td>{item.numberDocument}</td>
                                </tr>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher' || store.currentRole === 'manager') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Phone</th>
                                    <td>{item.phone}</td>
                                </tr>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Username</th>
                                    <td>{item.username}</td>
                                </tr>
                                <tr className={`${(store.currentRole === 'user' || store.currentRole === 'teacher') ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Gender</th>
                                    <td>{item.gender}</td>
                                </tr>
                                <tr className={`${store.currentRole === 'teacher' ? 'd-block' : 'd-none'}`}>
                                    <th scope="row">Certificate</th>
                                    <td>{item.certificateTeacher}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Actions</th>
                                    <td>
                                        <button onClick={() => handleUpdateUser(item.id)}>Edit</button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
};
