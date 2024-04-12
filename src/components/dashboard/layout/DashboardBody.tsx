import React from "react";
import { Outlet } from "react-router-dom";
import DashboardTitle from "./DashboardTitle";

const DashboardBody = () => {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-3 lg:p-6">
            <Outlet />
        </main>
    );
};

export default DashboardBody;
