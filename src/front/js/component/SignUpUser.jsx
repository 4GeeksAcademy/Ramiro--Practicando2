import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const SignUpUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pasaporte, setPasaporte] = useState("");
  const [address, setAddress] = useState('')
  const [payment_method, setPayment] = useState('')
  // const [loginError, setLoginError] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      email,
      password,
      username,
      firstname,
      lastname,
      pasaporte,
      payment_method, // Assurez-vous d'utiliser la clé correcte pour le paiement
      address,
    };

    let register = await actions.signupUser(userData);
    console.log(register);
    if (register) {
      //true
      navigate("/");
    } else {
      // Connexion échouée
      alert("Email already exists");
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de usuario</label>
          <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="firstname" onChange={(e) => setFirstname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="lastname" onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="pasaporte" className="form-label">Pasaporte</label>
          <input type="text" className="form-control" id="pasaporte" onChange={(e) => setPasaporte(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="payment" className="form-label">Método de pago</label>
          <input type="text" className="form-control" id="payment" onChange={(e) => setPayment(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary btn-signup">Crear mi cuenta</button>
      </form>
    </div>
  )
}

export default SignUpUser