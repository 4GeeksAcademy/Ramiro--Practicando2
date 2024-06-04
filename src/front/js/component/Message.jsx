import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Message = ({ type, text }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 7000); // Ocultar el mensaje después de 7 segundos

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    }, []);

    const handleClose = () => {
        setShow(false);
    };

    return (
        <div className='mt-5' style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999', // Valor alto para estar por encima de otros elementos
            width: '50%',
            margin: 'auto'
        }}>
            {show && (
                <div className={`alert alert-${type} text-center mt-3 fs-6 fw-bold alert-dismissible d-flex justify-content-center align-items-center`} role="alert">
                    <span style={{ margin: 'auto' }}>{text}</span>
                    <button type="button" className="btn-close" onClick={handleClose}></button>
                </div>
            )}
        </div>
    );
};


