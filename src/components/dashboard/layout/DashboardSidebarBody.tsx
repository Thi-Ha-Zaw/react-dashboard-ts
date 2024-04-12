import React, { useState } from "react";
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { FaChevronRight } from "react-icons/fa6";

import { Link, NavLink, useLocation } from "react-router-dom";

const DashboardSidebarBody = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { pathname } = useLocation();
    return (
        <div>
            <div>
                <Link
                    to={"/dashboard"}
                    className={` sidebar-link ${
                        pathname == "/dashboard" ? "active" : ""
                    }`}
                >
                    <Home className="h-4 w-4" />
                    Dashboard
                </Link>
                <NavLink to={"/"} className=" sidebar-link">
                    <ShoppingCart className="h-4 w-4" />
                    Orders
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                    </Badge>
                </NavLink>
                
                <NavLink to={"/dashboard/user"} className=" sidebar-link">
                    <Users className="h-4 w-4" />
                    Users
                </NavLink>
                <div className=" overflow-hidden cursor-pointer">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className=" flex justify-between items-center rounded-lg px-3 py-2 transition-all hover:text-primary"
                    >
                        <div className="flex items-center gap-3">
                            <LineChart className="h-4 w-4" />
                            Analytics
                        </div>
                        <div
                            className={` transform transition duration-500 ${
                                isOpen ? "rotate-90" : "rotate-0"
                            }`}
                        >
                            <FaChevronRight />
                        </div>
                    </div>

                    <div
                        className={`${
                            isOpen ? " h-36" : " h-0"
                        } transition-all duration-500`}
                    >
                        <div className="flex flex-col gap-2 text-sm rounded-lg py-2 transition-all">
                            <NavLink
                                to={"/dashboard/user"}
                                className=" sidebar-link ps-12"
                            >
                                {/* <Users className="h-4 w-4" /> */}
                                Users
                            </NavLink>
                            <p className=" sidebar-link ps-12">Analytics</p>
                            <p className=" sidebar-link ps-12">Analytics</p>
                        </div>
                    </div>
                </div>
                <NavLink to={"/dashboard/product"} className=" sidebar-link">
                    <Package className="h-4 w-4" />
                    Products{" "}
                </NavLink>
            </div>
        </div>
    );
};

export default DashboardSidebarBody;
