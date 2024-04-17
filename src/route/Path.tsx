import { Route, Routes } from "react-router-dom";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Dashboard from "../page/dashboard/Dashboard";
import ProductPage from "../page/dashboard/product/ProductPage";
import DashboardIndex from "../page/dashboard/DashboardIndex";
import AuthGuard from "../components/guard/AuthGuard";
import UnAuthGuard from "../components/guard/UnAuthGuard";
import UserPage from "../page/dashboard/user/UserPage";
import AdminGuard from "@/components/guard/AdminGuard";
import NotFoundPage from "@/components/error/NotFoundPage";

const Path = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <UnAuthGuard>
                            <Login />
                        </UnAuthGuard>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <AuthGuard>
                            <Dashboard />
                        </AuthGuard>
                    }
                >
                    <Route index element={<DashboardIndex />} />
                    <Route path="product" element={<ProductPage />} />
                    <Route
                        path="user"
                        element={
                            <AdminGuard>
                                <UserPage />
                            </AdminGuard>
                        }
                    />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default Path;
