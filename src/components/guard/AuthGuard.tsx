
import { useProfileQuery } from "../../app/service/authApi";
import { Navigate } from "react-router-dom";
import Loading from "../dashboard/utility/Loading";
import Cookies from "js-cookie";
import { ImportIcon } from "lucide-react";
import { useEffect } from "react";
import { Children } from "./types";
import { useAppDispatch } from "@/app/hooks";
import { userInfo } from "@/app/features/authSlice";



const AuthGuard = ({ children }: Children) => {
    const token = Cookies.get("token");

    const { data, isError, isLoading } = useProfileQuery(token);

    
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (isError) {
            Cookies.remove("token");
            Cookies.remove("user");
        }
        dispatch(userInfo(data?.user))
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
