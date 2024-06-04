import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext.js";

export const GetPayment = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleUpdatepayment = (payId) => {
        navigate(`/paymentUpdate/${payId}`);
    };

   

    if (!store.payment.payments || store.payment.payments.length === 0) {
        return <div>No hay payment disponibles</div>;
    }

    return (
        <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
            <table className="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">date</th>
                        <th scope="col">Title Course</th>
                        <th scope="col">Pad Amount</th>
                        <th scope="col">Type Payment</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Course ID</th>
                        <th scope="col">Manager Authorize</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.payment.payments.map((item, index) => (
                        <tr key={item.id || index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.date}</td>
                            <td>{item.titleCourse}</td>
                            <td>{item.padAmount}</td>
                            <td>{item.typePayment}</td>
                            <td>{item.userId}</td>
                            <td>{item.courseId}</td>
                            <td>{item.managerId}</td>
                            <td>
                                <button onClick={() => handleUpdatepayment(item.id)}>Edit</button>
                                <button onClick={() => actions.deletePayment(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
