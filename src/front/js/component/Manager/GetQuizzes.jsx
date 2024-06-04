import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext.js";

export const GetQuizzes = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleUpdateQuizzes = (quizId) => {
        navigate(`/UpdateQuizzes/${quizId}`);
    };



    if (!store.quizzes.Quiz || store.quizzes.Quiz.length === 0) {
        return <div>No hay cuestionarios disponibles</div>;
    }

    return (
        <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
            <table className="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question Title</th>
                        <th scope="col">Answer Teacher</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    {store.quizzes.Quiz.map((item, index) => (
                        <tr key={item.id || index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.questionTitle}</td>
                            <td>{item.answerTeacher}</td>
                            <td>
                                <button onClick={() => handleUpdateQuizzes(item.id)}>Edit</button>
                                <button onClick={() => actions.deleteQuizzes(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
