import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext.js';
import { Navbar } from '../../component/Navbar.jsx';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export const Course = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Store updated:", store);
    const foundCourse = store.course.access_to_courses.find(course => course.id === parseInt(id));

    console.log("Found course:", foundCourse);
    setCourse(foundCourse);
  }, [store, id, actions]);


  return (
    <>
      <Navbar />
      <div className="row-12">
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
      </div>
      {course ? (
        <>
          <div className="card mb-3 cardCourseInformation">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={course.titleUrlMedia}
                  className="img-fluid rounded-start"
                  alt="Course thumbnail"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">Number of assessments: {course.assessment}</small>
                  </p>
                  <div className="card-text">
                    <small className="text-body-secondary">You will get: {course.titleCertificateToGet}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row text-center text-md-start">
              <div className="col-12 col-md-4 border-end border-warning border-4 mb-3 mb-md-0 course-text">
                <span>Instructor: {course.titleTeacher}</span>
              </div>
              <div className="col-12 col-md-4 border-end border-warning border-4 mb-3 mb-md-0 course-text">
                <span>Course creation date: {course.createDate}</span>
              </div>
              <div className="col-12 col-md-4 border-warning border-4 course-text">
                <span>Course expiration Date: {course.dateExpiration}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No course data</div>
      )}
    </>
  );
};
