import React, { useEffect, useState, useContext } from "react";
import { Link , useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext.js";
import "../../../styles/home.css";

import { AddUser } from "../../component/AddUser.jsx";

export const FormUser = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <AddUser />
        </div>
       
    )
}