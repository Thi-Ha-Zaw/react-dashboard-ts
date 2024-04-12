import React, { useEffect } from "react";
import { useProfileQuery } from "../../app/service/authApi";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../dashboard/utility/Loading";
import Cookies from 'js-cookie'


const AuthGuard = ({ children }) => {
    const token = Cookies.get("token");

    const { data, isError, isLoading } = useProfileQuery(token);

    const nav = useNavigate();

    useEffect(() => {
        if (isError) {
           Cookies.remove("token");
           Cookies.remove("user");
        } 
    }, [data, isError]);

    if (isLoading) {
        return <Loading />;
  }
  
    if (isError) {
        return <Navigate to={"/"} />;
    }

    return <div>{children}</div>;
};

export default AuthGuard;
