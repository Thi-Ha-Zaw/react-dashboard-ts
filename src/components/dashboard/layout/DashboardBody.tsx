
import { Outlet } from "react-router-dom";


const DashboardBody = () => {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-3 lg:p-6 dark:bg-gray-900">
            <Outlet />
        </main>
    );
};

export default DashboardBody;
