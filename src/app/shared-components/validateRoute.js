import React, { useState} from "react";
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
function ValidateLogin(props) {
    const [isLoggedIn, setISLoggedIn] = useState(
        Cookies.get("token") == null ? false : true
    );

    return <>
        {isLoggedIn ? props.children : <Navigate to='/'/>}
    </>
}

export default ValidateLogin;