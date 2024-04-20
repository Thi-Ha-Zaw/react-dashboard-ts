import ChangePwDialog from "../../components/dashboard/auth/ChangePwDialog";
import DashboardBody from "../../components/dashboard/layout/DashboardBody";
import DashboardNavbar from "../../components/dashboard/layout/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/layout/DashboardSidebar";

const Dashboard = () => {
    return (
        <>
            <div className="grid min-h-screen w-full grid-cols-12 lg:grid-cols-[280px_1fr]">
                <div className="hidden col-span-3 md:col-span-4 lg:col-auto border-r bg-muted/40 md:block dark:bg-gray-800">
                    <DashboardSidebar />
                </div>

                <div className=" col-span-12 md:col-span-8 lg:col-auto flex flex-col">
                    <DashboardNavbar />
                    <DashboardBody />
                </div>
            </div>
            <ChangePwDialog />
        </>
    );
};

export default Dashboard;
