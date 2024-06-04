import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from "../../store/appContext";

export const HistoryCourses = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        titleOrder: '',
        price: '',
        total: '',
        date: '',
        userId: '',
        courseId: '',
        teacherId: '',
        courseName: '',
        teacherName: '',
        teacherLastName: '',
        userName: '',
        userLastName: ''
    });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createOrders(formData);
        handleCloseModal(); // Close modal after submitting
    };

    // Ensure store.order is initialized to an empty array if undefined
    const orders = store.order || [];

    return (
        <div className="container mx-auto">
            <h1 className="text-center my-4">My Purchased Courses</h1>
            <Button variant="primary" onClick={handleShowModal}>Add Order</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="titleOrder">
                            <Form.Label>Title of the Order</Form.Label>
                            <Form.Control type="text" name="titleOrder" value={formData.titleOrder} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="total">
                            <Form.Label>Total</Form.Label>
                            <Form.Control type="text" name="total" value={formData.total} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" name="date" value={formData.date} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Select name='userId' onChange={handleChange} value={formData.userId} required>
                                <option value="">--Choose--</option>
                                {store.user?.access_to_user?.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id}/{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="courseId">
                            <Form.Label>Course Id</Form.Label>
                            <Form.Select name='courseId' onChange={handleChange} value={formData.courseId} required>
                                <option value="">--Choose--</option>
                                {store.course?.access_to_courses?.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id}/{item.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="teacherId">
                            <Form.Label>Teacher Id</Form.Label>
                            <Form.Select name='teacherId' onChange={handleChange} value={formData.teacherId} required>
                                <option value="">--Choose--</option>
                                {store.user?.access_to_teacher?.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id}/{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="courseName">
                            <Form.Label>Title Course</Form.Label>
                            <Form.Select name='courseName' onChange={handleChange} value={formData.courseName} required>
                                <option value="">--Choose--</option>
                                {store.course?.access_to_courses?.map((item, index) => (
                                    <option key={index} value={item.title}>#{item.id}/{item.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="teacherName">
                            <Form.Label>Title Teacher</Form.Label>
                            <Form.Select name='teacherName' onChange={handleChange} value={formData.teacherName} required>
                                <option value="">--Choose--</option>
                                {store.user?.access_to_teacher?.map((item, index) => (
                                    <option key={index} value={item.name}>#{item.id}/{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="teacherLastName">
                            <Form.Label>Teacher Last Name</Form.Label>
                            <Form.Select name="teacherLastName" onChange={handleChange} value={formData.teacherLastName} required>
                                <option value="">--Choose--</option>
                                {store.user?.access_to_teacher?.map((item, index) => (
                                    <option key={index} value={item.lastName}>#{item.id}/{item.lastName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="userName">
                            <Form.Label>Name</Form.Label>
                            <Form.Select name='userName' onChange={handleChange} value={formData.userName} required>
                                <option value="">--Choose--</option>
                                {store.user?.access_to_user?.map((item, index) => (
                                    <option key={index} value={item.name}>#{item.id}/{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="userLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Select name='userLastName' onChange={handleChange} value={formData.userLastName} required>
                                <option value="">--Choose--</option>
                                {store.user?.access_to_user?.map((item, index) => (
                                    <option key={index} value={item.lastName}>#{item.id}/{item.lastName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className='mx-5 my-2 py-3 px-3 text-center'>
                <div>
                    {orders.length === 0 ? (
                        "No hay Courses Registrados"
                    ) : (
                        <table className="table mx-auto">
                            <thead>
                                <tr style={{ backgroundColor: 'lightblue' }}>
                                    <th scope="col">#</th>
                                    <th scope="col">Title Order</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Teacher name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.titleOrder}</td>
                                        <td>{item.date}</td>
                                        <td>{item.courseName}</td>
                                        <td>{item.teacherName}</td>
                                        <td>{item.teacherLastName}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};