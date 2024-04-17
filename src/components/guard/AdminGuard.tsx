import { Children } from "./types";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Loading from "../dashboard/utility/Loading";
import { useProfileQuery } from "@/app/service/authApi";


const AdminGuard = ({ children }: Children) => {
    const token = Cookies.get("token");

    const { data, isError, isLoading } = useProfileQuery(token);


    if (isLoading) {
        return <Loading />;
    }

    if (data?.user?.role[0] != "admin") {
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
};

export default AdminGuard;
