import React, { useEffect } from "react";
import { useProfileQuery } from "../../app/service/authApi";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const UnAuthGuard = ({ children }) => {
    const token = Cookies.get("token");

    if (token) {
        return <Navigate to={'/dashboard'} />
    }

    return <div>{children}</div>;
};

export default UnAuthGuard;
