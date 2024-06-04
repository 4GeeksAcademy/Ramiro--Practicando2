
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../store/appContext'
import { CloudinaryComponent } from '../CloudinaryComponent.jsx';

export const CreateCategory= () => {
    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(false)
    const [counter, setCounter] = useState(7)
    const [categoryData, setCategoryData] = useState({
        titleCategory: '',
        subCategory: '',
        categoryLength: '',
        courseMoreCurrent: '',
        courseMoreSold: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({
            ...categoryData,
            [name]: value
        });
    };

    async function handlerCreateCategory(e) {
        e.preventDefault();
        if (categoryData.titleCategory !== '' && categoryData.subCategory !== '' && categoryData.categoryLength !== '' && categoryData.courseMoreCurrent !== '' && categoryData.courseMoreSold !== '') {
            await actions.createCategory(categoryData)
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
                {(msgError === '' && msg === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-danger" : "d-none"}`}>
                        {"Internet or server connection failure"}
                    </div>
                ) : (msgError === '') ? (
                    <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 5) ? "alert alert-success" : "d-none"}`}>
                        {msg}
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
                            <h1>Create Category</h1>
                        </div>
                    </div>
                    <form onSubmit={handlerCreateCategory}>
                        <div>
                        
                            <label>Title Category:</label>
                            <input
                                type="text"
                                name="titleCategory"
                                value={categoryData.titleCategory}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Sub Category:</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={categoryData.subCategory}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Category Length:</label>
                            <input
                                type="number"
                                name="categoryLength"
                                value={categoryData.categoryLength}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Course More Current:</label>
                            <input
                                type="text"
                                name="courseMoreCurrent"
                                value={categoryData.courseMoreCurrent}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                        <div>
                            <label>Courser More Sold:</label>
                            <input
                                type="number"
                                name="courseMoreSold"
                                value={categoryData.courseMoreSold}
                                onChange={handleChange}
                                id="validationFormCheck1"
                                className="form-control" />
                            <div className="invalid-feedback">
                                Please enter your information.
                            </div>
                        </div>
                       
                        <button className="btn btn-primary my-3" type='submit'>Create Category</button>
                    </form>
                </div>
            </div>

        </div>
    );
};


