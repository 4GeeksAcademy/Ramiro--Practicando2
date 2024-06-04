import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext';

export const Payments = () => {
    const { store, actions } = useContext(Context);
    
    const navigate = useNavigate();

    const handleUpdatePayment = (paymentId) => {
        navigate(`/paymentUpdate/${paymentId}`);
    };

    const deletePayment = ( paymentId) => {
        actions.deletePayment( paymentId);
    };

    return (
        <div className="card mb-3">
            <img src="https://revistadeconsultoria.com/wp-content/uploads/2023/12/1469101133738_1-1.jpg" className="card-img-top" alt="Pagos" />
            <div className="card-body">
                <h5 className="card-title">Payments</h5>
                <div>
                        {store.payment.payment === 0 ? (
                            "No hay Students Registrados"
                        ) : (
                            <table className="table mx-auto">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Date Start</th>
                                        <th scope="col">Title Course</th>
                                        <th scope="col">Pad Amount</th>
                                        <th scope="col">Type Payment</th>
                                        {/* <th scope="col">Phone</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Gender</th> */}
                                        <th scope="col">EDIT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.payment.payment.map((item, index) => (
                                        <tr key={item.id || index}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.date}</td>
                                            <td>{item.titleCourse}</td>
                                            <td>{item.padAmount}</td>
                                            <td>{item.typePayment}</td>
                                            {/* <td>{item.phone}</td>
                                            <td>{item.username}</td>
                                            <td>{item.gender}</td> */}
                                            <td>
                                                <button onClick={() => handleUpdatePayment(item.id)}>Edit</button>
                                                <button onClick={() => deletePayment(rol, item.id)}>Del</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                </div>
            </div>
        </div>
    )
}

