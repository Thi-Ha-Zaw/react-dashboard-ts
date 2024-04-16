
import DashboardSidebarBody from "./DashboardSidebarBody";
import DashboardLogo from "./DashboardLogo";

const DashboardSidebar = () => {
    return (
        <div className="flex h-full flex-col gap-2">
            
            <DashboardLogo />
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <DashboardSidebarBody />
                </nav>
            </div>
            
        </div>
    );
};

export default DashboardSidebar;
