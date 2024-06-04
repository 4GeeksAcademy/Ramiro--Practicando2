import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { GrFormPreviousLink } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";

export const UpdatePayment = () => {
    const { actions, store } = useContext(Context);
    const [redirectPath, setRedirectPath] = useState('');
    const [counter, setCounter] = useState(7);
    const { payId } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(() => {
        const payToUpdate = store.payment.payments.find(pay => pay.id === parseInt(payId));
        if (payToUpdate) {
            return {
                date: payToUpdate.date,
                currency_code: payToUpdate.currency_code,
                status: payToUpdate.status,
                value: payToUpdate.value,
                typePayment: payToUpdate.typePayment,
                courseId: payToUpdate.courseId,
                userId: payToUpdate.userId

            };
        } else {
            return {
                date: '',
                currency_code: '',
                value: '',
                status: '',
                typePayment: '',
                courseId: '',
                userId: ''
            };
        }
    })



    useEffect(() => {
        // Obtener los detalles del usuario específico y establecer los datos en el estado local
        const payToUpdate = store.payment.payments.find(pay => pay.id === parseInt(payId));
        if (payToUpdate) {
            setCourseData({
                date: payToUpdate.date,
                currency_code: payToUpdate.currency_code,
                status: payToUpdate.status,
                value: payToUpdate.value,
                typePayment: payToUpdate.typePayment,
                courseId: payToUpdate.courseId,
                userId: payToUpdate.userId
            });
        }
    }, [payId, store.payment.payments]);



    const [payData, setPayData] = useState({
        date: '',
        currency_code: '',
        value: '',
        status: '',
        typePayment: '',
        courseId: '',
        userId: ''
    });

    useEffect(() => {
        const payToUpdate = store.payment.payments.find(pay => pay.id === parseInt(payId));
        if (payToUpdate) {
            setPayData({
                date: payToUpdate.date,
                currency_code: payToUpdate.currency_code,
                status: payToUpdate.status,
                value: payToUpdate.value,
                typePayment: payToUpdate.typePayment,
                courseId: payToUpdate.courseId,
                userId: payToUpdate.userId
            });
        }
    }, [payId, store.payment.payments]);

    const handleChange = e => {
        const { name, value } = e.target;
        setPayData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();

        await actions.updatePayment(payData, payId);
        setCounter(0);
        navigate('/managerView');
        resetForm(); 
    }

    function handlerGoToHome() {
        navigate('/managerView');
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
                if (msgError === '' && msg2 === '') {
                    return prevCounter;
                } else if (store.error === '' && counter === 7) {
                    setRedirectPath(`/managerView`);
                    clearInterval(interval);
                }
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [setRedirectPath, store.error, counter, msg2, msgError]);

    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg2 = typeof store.msg2 === 'string' ? store.msg2 : JSON.stringify(store.msg2);


    const resetForm = () => {
        setPayData({
            date: '',
            titleCourse: '',
            padAmount: '',
            typePayment: '',
            courseId: '',
            userId: ''
        });
    };


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

            <h1>Update Payment</h1>
            <div>
                <button onClick={handlerGoToHome}>Regresar</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Status</label>
                        <input
                            type="text"
                            name="status"
                            value={payData.status}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Currency</label>
                        <input
                            type="text"
                            name="currency_code"
                            value={payData.currency_code}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={payData.date}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Type Payment</label>
                        <input
                            type="text"
                            name="typePayment"
                            value={payData.typePayment}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Pad Amount</label>
                        <input
                            type="text"
                            name="value"
                            value={payData.value}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>User ID</label>
                        <select className="form-select" name='userId' onChange={handleChange} value={payData.userId} required>
                            <option value="">--Choose--</option>
                            {store.user.access_to_user.map((item, index) => (
                                <option key={index} value={item.id}>#{item.id}/{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Course ID</label>
                        <select className="form-select" name='courseId' onChange={handleChange} value={payData.courseId} required>
                            <option value="">--Choose--</option>
                            {store.course.access_to_courses.map((item, index) => (
                                <option key={index} value={item.id}>#{item.id}/{item.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Manager ID</label>
                        <select className="form-select" name='managerId' onChange={handleChange} value={payData.managerId} required>
                            <option value="">--Choose--</option>

                            <option value={1}>#{1}/{"Manager"}</option>

                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {store.spinner ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <div className="row align-items-center">
                                <div className="col align-self-center text-center fs-4">
                                    <span>Update Payment</span>
                                </div>
                            </div>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
