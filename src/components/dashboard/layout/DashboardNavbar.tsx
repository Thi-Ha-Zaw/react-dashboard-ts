import { CircleUser, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaPowerOff } from "react-icons/fa6";
import DashboardPhoneSidebar from "./DashboardPhoneSidebar";
import { useLogoutMutation } from "../../../app/service/authApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setChangePwDialog } from "../../../app/features/authSlice";

import { useTheme } from "@/app/features/theme/theme-provider";

const DashboardNavbar = () => {
    const token = Cookies.get("token");

    const dispatch = useDispatch();

    const [logout] = useLogoutMutation();

    const { toast } = useToast();

    const nav = useNavigate();

    const { setTheme } = useTheme();

    const handleLogout = async () => {
        const res = await logout(token);
        if (res.data) {
            Cookies.remove("token");
            Cookies.remove("user");
            toast({
                title: "Logout successfully",
            });
            nav("/");
        }
    };

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <DashboardPhoneSidebar />

            <div className="w-full flex-1">
                {/* <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form> */}
            </div>

            <div className=" flex gap-2 items-center">
                <div className=" border-r pe-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className=" dark:bg-slate-50 text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:w-9 dark:h-9">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setTheme("system")}
                            >
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                className=" cursor-pointer"
                                onClick={() =>
                                    dispatch(setChangePwDialog(true))
                                }
                            >
                                Change password{" "}
                            </DropdownMenuItem>
                            <DropdownMenuItem className=" cursor-pointer">
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className=" flex gap-2 cursor-pointer"
                            >
                                <p>Logout</p>
                                <FaPowerOff className="" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
