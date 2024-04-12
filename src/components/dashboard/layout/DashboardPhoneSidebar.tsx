import React, { useState } from "react";
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
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
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
