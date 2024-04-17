import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import DashboardSidebarBody from "./DashboardSidebarBody";

const DashboardPhoneSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden dark:bg-gray-900 dark:border-gray-700"
                >
                    <Menu className="h-5 w-5 dark:text-gray-50" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <DashboardSidebarBody />
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default DashboardPhoneSidebar;
