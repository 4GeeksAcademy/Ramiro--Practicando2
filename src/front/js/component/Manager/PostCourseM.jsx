import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { CloudinaryComponent } from '../CloudinaryComponent.jsx';
import { FaRegImages } from "react-icons/fa6";

export const PostCourseM = () => {
    const { store, actions } = useContext(Context);
    const [active, setActive] = useState(false);
    const [counter, setCounter] = useState(7);
    const [courseData, setCourseData] = useState({
        title: '',
        categoryTitle: '',
        modulesLength: '',
        titleCertificateToGet: '',
        price: '',
        description: '',
        assessment: '',
        titleTeacher: '',
        dateExpiration: '',
        titleUrlMedia: `${store.media}`
    });

    const [media, setMedia] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const resetCourseData = () => {
        setCourseData({
            title: '',
            categoryTitle: '',
            modulesLength: '',
            titleCertificateToGet: '',
            price: '',
            description: '',
            assessment: '',
            titleTeacher: '',
            dateExpiration: '',
            titleUrlMedia: ''
        });
    };

    async function handlerCreateCourse(e) {
        e.preventDefault();
        if (courseData.title !== '' && courseData.categoryTitle !== '' && courseData.modulesLength !== '' && courseData.titleCertificateToGet !== '' && courseData.price !== '') {
            console.log("Creating course with data:", courseData);
            await actions.createCourseNew(courseData);
            setCounter(0);
            resetCourseData()
        } else {
            alert('Ingrese todos los campos');
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => prevCounter + 1);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const uploadMedia = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            await actions.uploadCloudinaryMedia(files);
            console.log("Uploaded media:", store.media);
        }
    }

    useEffect(() => {
        console.log("Media updated:", store.media);
        setMedia(store.media);
        setMediaType(store.mediaType);
        setLoading(store.loading);
        setCourseData(prevData => ({
            ...prevData,
            titleUrlMedia: store.media
        }));
    }, [store.media, store.mediaType, store.loading]);

    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg);

    return (
        <div className='container-fluid d-flex justify-content-center align-items-start position-relation'>
            <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                <div className="d-flex justify-content-center align-items-center position-relative mb-5">
                    <div className='d-flex justify-content-center align-items-center'>
                        <h1>Create New Course</h1>
                    </div>
                </div>
                <form onSubmit={handlerCreateCourse}>
                    <div>
                    <div className="container">
                                <h2 className="text-center my-4">Upload Media</h2>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 d-flex justify-content-center">
                                        <label htmlFor="postCourse" className="fileUploader btn btn-secondary mb-3 d-flex align-items-center justify-content-center" style={{ borderRadius: '10px', width: '60%', height: '170px' }}>
                                            <FaRegImages style={{ width: '50%', height: '50%' }}/>
                                        </label>
                                        <input id="postCourse" type="file" className="d-none" onChange={uploadMedia} />
                                    </div>
                                </div>
                                <div className="row justify-content-center my-4">
                                    <div className="col-md-8">
                                        {store.loading ? (
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            store.media && (
                                                store.mediaType === 'image' ? (
                                                    <img src={store.media} className="img-fluid" alt="Uploaded" />
                                                ) : (
                                                    <video controls className="img-fluid">
                                                        <source src={store.media} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={courseData.title}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Category Title:</label>
                        <input
                            type="text"
                            name="categoryTitle"
                            value={courseData.categoryTitle}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Modules Length:</label>
                        <input
                            type="number"
                            name="modulesLength"
                            value={courseData.modulesLength}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Title Certificate To Get:</label>
                        <input
                            type="text"
                            name="titleCertificateToGet"
                            value={courseData.titleCertificateToGet}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={courseData.price}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            type="text"
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" >
                        </textarea>
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Title Teacher:</label>
                        <input
                            type="text"
                            name="titleTeacher"
                            value={courseData.titleTeacher}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Assessment:</label>
                        <input
                            type="text"
                            name="assessment"
                            value={courseData.assessment}
                            onChange={handleChange}
                            id="validationFormCheck1"
                            className="form-control" />
                        <div className="invalid-feedback">
                            Please enter your information.
                        </div>
                    </div>
                    <div>
                        <label>Date Expiration:</label>
                        <input
                            type="date"
                            name="dateExpiration"
                            value={courseData.dateExpiration}
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
    );
};
