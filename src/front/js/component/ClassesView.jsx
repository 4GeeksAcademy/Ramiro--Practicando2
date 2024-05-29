import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import styles from "./ClassesView.module.css";
import EditClasses from "../pages/EditClasses.jsx";
const ClassesView = () => {
    const { actions, store } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        actions.getClasses();
    }, [actions]);

    const handlerEdit = (item) => {
        setSelectedClass(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedClass(null);
    };

    return (
        <div className={`container-fluid ${styles.classesViewContainer}`}>
            <h1 className={styles.title}>Clases Activas</h1>
            <div className="table-responsive">
                <table className={`table ${styles.table}`}>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th className="text-center" scope="col">Date class</th>
                            <th className="text-center" scope="col">Start time</th>
                            <th className="text-center" scope="col">Duration minutes</th>
                            <th className="text-center" scope="col">Available slots</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.classesData && store.classesData.filter(item => item.Class_is_active).map((item) => (
                            <tr key={item.name} className={styles.tableRow}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td className="text-center">{item.dateTime_class.slice(0, 16)}</td>
                                <td className="text-center">{item.start_time}</td>
                                <td className="text-center">{item.duration_minutes}</td>
                                <td className="text-center">{item.available_slots}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        className={styles.editButton}
                                        onClick={() => handlerEdit(item)}
                                    >
                                        Editar clase
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h1 className={styles.title}>Clases canceladas</h1>
            <div className="table-responsive">
                <table className={`table ${styles.table}`}>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th className="text-center" scope="col">Date class</th>
                            <th className="text-center" scope="col">Start time</th>
                            <th className="text-center" scope="col">Duration minutes</th>
                            <th className="text-center" scope="col">Available slots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.classesData && store.classesData.filter(item => !item.Class_is_active).map((item) => (
                            <tr key={item.name} className={styles.tableRow}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td className="text-center">{item.dateTime_class.slice(0, 16)}</td>
                                <td className="text-center">{item.start_time}</td>
                                <td className="text-center">{item.duration_minutes}</td>
                                <td className="text-center">{item.available_slots}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.titlemodal}>Editar Clase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedClass && (
                        <EditClasses
                            classData={selectedClass}
                            onClose={handleCloseModal}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ClassesView;