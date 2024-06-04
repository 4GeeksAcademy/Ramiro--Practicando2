import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignOut = () => {
    const navigate = useNavigate()
    function handleHomeView() {
        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Atlas learning</a>

                </div>
            </nav>
            <div className='d-flex justify-content-center align-items-center text-center'>
                <div className='border border-black rounded my-5 mx-3 py-5 px-3'>
                    <h3>Se ha Cerrado Sessión, vuelva pronto</h3>
                    <p className='text-decoration-underline fw-bold text-primary' onClick={handleHomeView} style={{ cursor: "pointer" }}>CLICH HERE, Go to Home</p>
                </div>
            </div>
        </div>
    )
}