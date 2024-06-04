import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";

export const QuizzesCourse = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        questionTitle: '',
        answerTeacher: '',
        answerUser: '',
        approved: '',
        approvalPercentageUser: '',
        approvalPercentageNumber: '',
        approvalPercentage: '',
        moduleId: '',
    });

    const navigate = useNavigate();

   

    const handleChange = (e) => {
        const { name, value } = e.target;

        let parsedValue = value;
        if (name === "answerUser" || name === "approved" || name === "approvalPercentage") {
            parsedValue = value === "true" ? true : value === "false" ? false : '';
        } else if (name === "approvalPercentageUser" || name === "approvalPercentageNumber" || name === "moduleId") {
            parsedValue = value === '' ? '' : parseInt(value, 10);
        }

        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Form Data:", formData); // Verificar los datos del formulario antes de enviarlos

        try {
            await actions.postQuizzes(formData);
            console.log("Quiz created successfully");
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    return (
        <div className="container">
            <h2>Create Quiz for Course Module</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question Title</label>
                    <input
                        type="text"
                        name="questionTitle"
                        value={formData.questionTitle}
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
                        value={formData.answerTeacher}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Answer User</label>
                    <select className="form-select" name='answerUser' onChange={handleChange} value={formData.answerUser} required>
                        <option value="">--Choose--</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Approved</label>
                    <select className="form-select" name='approved' onChange={handleChange} value={formData.approved} required>
                        <option value="">--Choose--</option>
                        <option value="true">Aprobado</option>
                        <option value="false">Reprobado</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Approval Percentage User</label>
                    <input
                        type="text"
                        name="approvalPercentageUser"
                        value={formData.approvalPercentageUser}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Approval Percentage Number</label>
                    <input
                        type="number"
                        name="approvalPercentageNumber"
                        value={formData.approvalPercentageNumber}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Approval Percentage</label>
                    <select className="form-select" name='approvalPercentage' onChange={handleChange} value={formData.approvalPercentage} required>
                        <option value="">--Choose--</option>
                        <option value="true">Aprobado</option>
                        <option value="false">Reprobado</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Module ID</label>
                    <select className="form-select" name='moduleId' onChange={handleChange} value={formData.moduleId} required>
                        <option value="">--Choose--</option>
                        {
                            (!store.modules || !store.modules.Modules || store.modules.Modules.length === 0)
                                ? (<option value="">Sin Datos</option>)
                                : (store.modules.Modules.map((item, index) => (
                                    <option key={index} value={item.id}>#{item.id}/{item.title}</option>
                                )))
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Quiz</button>
            </form>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
                <GoArrowLeft /> Back
            </button>
        </div>
    );
};
