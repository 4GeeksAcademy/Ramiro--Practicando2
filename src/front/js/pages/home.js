import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import form from "../../img/Gast2.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center bg-black fullscreen-container ">
			<div className="text-center mx-auto py-5 bg-white w-25">
				<img className="form" src={form}/>
				<form>
					<li>Nombre de Lista</li>
					<input type="text"/>
					<li>Contraseña</li>
					<input type="password"/><br/>
					<button>iniciar</button>
				</form>
				<button>Crear una Nueva Lista de Gastos</button>
			</div>
		</div>
	);
};
