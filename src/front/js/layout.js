import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/home";
import { ViewGeneral } from "./pages/viewGeneral";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ViewGeneral } from "./pages/viewGeneral";
import { PymeView } from "./pages/viewPyme";
import { Register } from "./pages/register";

import { Navbar } from "./component/navbar";
import { Jumbotron } from "./component/jumbotron";
import { Card } from "./component/Card";
import { Barra } from "./component/barra";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (

			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Barra />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/viewGeneral">
							<ViewGeneral />
						</Route>
						<Route exact path="/viewPyme">
							<PymeView />
                         </Route>   
						<Route exact path="/viewgeneral/:theid">
							<ViewGeneral />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>

	);
};

export default injectContext(Layout);
