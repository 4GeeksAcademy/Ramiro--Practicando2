
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../store/appContext'
import { CloudinaryComponent } from '../CloudinaryComponent.jsx';

export const CreatePayment = () => {
    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(false)
    const [counter, setCounter] = useState(7)
    const [paymentData, setPaymentData] = useState({
        date: '',
        currency_code: '',
        value: '',
        status: '',
        typePayment: '',
        userId: '',
        courseId: '',
        managerId: 1
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value
        });
    };

    async function handlerCreateCategory(e) {
        e.preventDefault();
        if (paymentData.titleCourse !== '' && paymentData.padAmount !== '' && paymentData.typePayment !== '') {
            await actions.createPayments(paymentData)
            setCounter(0)
        } else {
            alert('Ingrese todo los campos')
        }
    }

    function handlerChangeActive() {
        setActive(false)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval)
    }, [])



    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error)
    const msg2 = typeof store.msg2 === 'string' ? store.msg2 : JSON.stringify(store.msg2)

    return (
        <div className='position-relative'>
            {/* Msg */}
            <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x'>
                {(msgError === '' && msg2 === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {"Internet or server connection failure"}
                    </div>
                ) : (msgError === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg2}
                    </div>
                ) : (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {msgError}
                    </div>
                )}
            </div>

            <div className='d-flex justify-content-center align-items-start'>
                <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                    <div className="d-flex justify-content-center align-items-center position-relative mb-5">
                        <div className='d-flex justify-content-center align-items-center'>
                            <h1>Create Payment</h1>
                        </div>
                    </div>
                    <form onSubmit={handlerCreateCategory}>
                        <div>

                            <label>Transaccion:</label>
                            <input
                                type="text"
                                name="status"
                                value={paymentData.status}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={paymentData.date}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Pad Amount:</label>
                            <select className="form-select" name='value' onChange={handleChange} value={paymentData.value} required>
                                <option value="">--Choose--</option>
                                {
                                    (store.course.access_to_courses.length == 0) 
                                    ? <option value="">Sin Datos</option>
                                    :store.course.access_to_courses.map((item, index) => (
                                        <option key={index} value={parseInt(item.price, 10)}>{item.title} ${item.price}</option>
                                    ))
                                }

                            </select>
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Type Payment:</label>
                            <select className="form-select" name='typePayment' onChange={handleChange} value={paymentData.typePayment} required>
                                <option value="">--Choose--</option>
                                <option value="paypal">Paypal</option>
                                <option value="TDC/TDD">Tarjeta de Debito / Credito</option>currency_code
                            </select>
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>

                        <div>
                            <label>Type Payment:</label>
                            <select className="form-select" name='currency_code' onChange={handleChange} value={paymentData.currency_code} required>
                                <option value="">--Choose--</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Course ID</label>
                            <select className="form-select" name='courseId' onChange={handleChange} value={paymentData.courseId} required>
                                <option value="">--Choose--</option>
                                {
                                    (store.course.access_to_courses.length == 0) 
                                    ? <option value="">Sin Datos</option>
                                    :store.course.access_to_courses.map((item, index) => (
                                        <option key={index} value={parseInt(item.id)}>#{item.id}/{item.title}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>User ID</label>
                            <select className="form-select" name='userId' onChange={handleChange} value={paymentData.userId} required>
                                <option value="">--Choose--</option>
                                {
                                    (store.user.access_to_user.length == 0) 
                                    ? <option value="">Sin Datos</option>
                                    :store.user.access_to_user.map((item, index) => (
                                        <option key={index} value={parseInt(item.id)}>#{item.id}/{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <button className="btn btn-primary my-3" type='submit'>Create Payment</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

{/* <label>Title Course:</label>
                            <select className="form-select" name='titleCourse' onChange={handleChange} value={paymentData.titleCourse} required>
                                <option value="">--Choose--</option>
                                {
                                    (store.course.access_to_courses.length == 0) 
                                    ? <option value="">Sin Datos</option>
                                    :store.course.access_to_courses.map((item, index) => (
                                        <option key={index} value={item.title}>{item.title}</option>
                                    ))
                                }
                            </select>
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div> */}