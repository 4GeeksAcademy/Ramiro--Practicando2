import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../store/appContext'

export const QuizzForm = () => {

    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(false)
    const [counter, setCounter] = useState(7)
    const [quizzData, setQuizzData] = useState({
        questionTitle: '',
        answer: '',
        moduleId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizzData({
            ...quizzData,
            [name]: value
        });
    };

    async function handlerCreateQuizz(e) {
        e.preventDefault();
        if (quizzData.questionTitle !== '' && quizzData.answer !== '' && quizzData.moduleId !== '') {
            await actions.newQuizz(quizzData)
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
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg)


    return (
        <div className='position-relative'>
            {/* Msg */}
            <div className='d-flex justify-content-center position-fixed position-absolute top-0 start-50 translate-middle-x'>
                {msgError === ''
                    ? <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg}
                    </div>
                    : <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {msgError}
                    </div>}
            </div>

            <div className='col-md-12 col-lg-5 d-flex justify-content-center align-items-start'>
                <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                    <div className="d-flex justify-content-center align-items-center position-relative mb-5">
                        <div className='d-flex justify-content-center align-items-center'>
                            <h1>Create New Quizz</h1>
                        </div>
                    </div>
                    <form onSubmit={handlerCreateQuizz}>
                        <div>
                            <label>Quizz title</label>
                            <input
                                type="text"
                                name="questionTitle"
                                value={quizzData.questionTitle}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Answer:</label>
                            <input
                                type="text"
                                name="answer"
                                value={quizzData.answer}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Module Id:</label>
                            <input
                                type="number"
                                name="moduleId"
                                value={quizzData.moduleId}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <button className="btn btn-primary my-3" type='submit'>Upload Course</button>
                    </form>
                </div>
            </div>
        </div>
    )
}





