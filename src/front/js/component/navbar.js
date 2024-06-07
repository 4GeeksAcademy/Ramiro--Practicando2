import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/gastosblanco.png"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-black">
			<div className="container p-3">
				<Link to="/">
					<img className="" src={logo} style={{height:"80px",width:"80px"}}/>
				</Link>
			</div>
		</nav>
	);
};
