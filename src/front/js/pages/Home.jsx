import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../component/Navbar.jsx";
import { CoursesContainer } from "../component/Courses/CoursesContainer.jsx";
import { Carousel } from "./Carousel.jsx";
import { Category } from "./Category.jsx";
import { Suscribe } from "./Suscribe.jsx";



export const Home = () => {
    const { store, actions } = useContext(Context);


    return (
        <div>
            <Navbar />
            <Carousel />
            <CoursesContainer />
            {/* <Category /> */}
            <Suscribe />
        </div>
    );
}
