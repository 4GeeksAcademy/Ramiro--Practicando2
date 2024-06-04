import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { GrFormPreviousLink } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";

export const UpdateQuizzes = () => {
    const { actions, store } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('');
    const [certificate, setCertificate] = useState('');
    const [isUsers, setIsUsers] = useState(true);
    const [redirectPath, setRedirectPath] = useState('');
    const [counter, setCounter] = useState(7);
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quizData, setquizData] = useState(() => {
        const quizToUpdate = store.quizzes.Quiz.find(quiz => quiz.id == quizId);
        if (quizToUpdate) {
            return {
                questionTitle: quizToUpdate.questionTitle,
                answerTeacher: quizToUpdate.answerTeacher,
                answerUser: quizToUpdate.answerUser,
                approved: quizToUpdate.approved,
                approvalPercentage: quizToUpdate.approvalPercentage,
                approvalPercentageUser: quizToUpdate.approvalPercentageUser,
                approvalPercentageNumber: quizToUpdate.approvalPercentageNumber,
                moduleId: quizToUpdate.moduleId
            };
        } else {
            return {
                questionTitle: '',
                answerTeacher: '',
                answerUser: false,
                approved: false,
                approvalPercentageUser: '',
                approvalPercentageNumber: '',
                approvalPercentage: false,
                moduleId: '',
            };
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();
        await actions.updateQuizzes(quizData, quizId);
        setCounter(0);
    }

    useEffect(() => {
        const quizToUpdate = store.quizzes.Quiz.find(quiz => quiz.id === quizId);
        if (quizToUpdate) {
            setquizData({
                questionTitle: quizToUpdate.questionTitle,
                answerTeacher: quizToUpdate.answerTeacher,
                answerUser: quizToUpdate.answerUser,
                approved: quizToUpdate.approved,
                approvalPercentage: quizToUpdate.approvalPercentage,
                approvalPercentageUser: quizToUpdate.approvalPercentageUser,
                approvalPercentageNumber: quizToUpdate.approvalPercentageNumber,
                moduleId: quizToUpdate.moduleId
            });
        }
    }, [quizId, store.quizzes.Quiz]);

    const handleChange = e => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'answerUser' || name === 'approved' || name === 'approvalPercentage') {
            newValue = value === 'true';
        }

        setquizData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (quizData.questionTitle !== '' && quizData.answerUser !== '' && quizData.answerTeacher !== '') {
            actions.updateQuizzes(quizData, quizId);
        } else {
            alert('You must not leave any field empty.');
        }
    };

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
                } else if (store.error === '' && selectedRole !== '' && counter === 7) {
                    setRedirectPath('/managerView');
                    clearInterval(interval);
                }
                return prevCounter + 1;
            });
        }, 500);
        return () => clearInterval(interval);
    }, [setRedirectPath, store.error, counter, msg2, msgError]);

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
            <h1>Update Quiz</h1>
            <div>
                <button onClick={handlerGoToHome}>Regresar</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Question Title</label>
                        <input
                            type="text"
                            name="questionTitle"
                            value={quizData.questionTitle}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Answer Teacher</label>
                        <input
                            type="text"
                            name="answerTeacher"
                            value={quizData.answerTeacher}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Answer User</label>
                        <select className="form-select" name='answerUser' onChange={handleChange} value={quizData.answerUser} required>
                            <option value="">--Choose--</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Approved</label>
                        <select className="form-select" name='approved' onChange={handleChange} value={quizData.approved} required>
                            <option value="">--Choose--</option>
                            <option value={true}>Aprobado</option>
                            <option value={false}>Reprobado</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Approval Percentage User</label>
                        <input
                            type="text"
                            name="approvalPercentageUser"
                            value={quizData.approvalPercentageUser}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Approval Percentage Number</label>
                        <input
                            type="text"
                            name="approvalPercentageNumber"
                            value={quizData.approvalPercentageNumber}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Approval Percentage</label>
                        <select className="form-select" name='approvalPercentage' onChange={handleChange} value={quizData.approvalPercentage} required>
                            <option value="">--Choose--</option>
                            <option value={true}>Aprobado</option>
                            <option value={false}>Reprobado</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Module ID</label>
                        <select className="form-select" name='moduleId' onChange={handleChange} value={quizData.moduleId} required>
                            <option value="">--Choose--</option>
                            {
                                store.modules.Modules.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id}/{item.title}</option>
                                ))
                            }
                        </select>
                    </div>
                </form>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handlerSubmit}>
                    {
                        (store.spinner)
                            ? <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : <div className="row align-items-center">
                                <div className="col align-self-center text-center fs-4">
                                    <span>Update User</span>
                                </div>
                            </div>
                    }
                </button>
            </div>
        </div>
    );
}