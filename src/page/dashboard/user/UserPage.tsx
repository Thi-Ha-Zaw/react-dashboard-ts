import React, { useState } from "react";

import { File, ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import {
    useGetRolesQuery,
    useGetUsersQuery,
} from "../../../app/service/userApi";
import { setCreateDialogOpen } from "../../../app/features/userSlice";

import UserTable from "../../../components/dashboard/user/UserTable";
import PaginationUI from "../../../components/dashboard/pagination/PaginationUI";
import DashboardTitle from "../../../components/dashboard/layout/DashboardTitle";
import SearchBar from "../../../components/dashboard/utility/SearchBar";

const UserPage = () => {
    //get token from Cookies
    const token = Cookies.get("token");

    // fetch all roles
    const { data: allRoles, isLoading: isRoleLoading } =
        useGetRolesQuery(token);

    const dispatch = useDispatch();
    

    //utility filtering
    const [filter, setFilter] = useState({
        currentPage: 1, // Initialize the current page
        search: "", // Initialize searching
        role: "", // Initialize role
        perPage: "", // Initialize role
    });

    //fetch all users data by pagination
    const { data, isLoading } = useGetUsersQuery({
        token,
        page: filter.currentPage,
        keyword: filter.search,
        role: filter.role,
        perPage: filter.perPage,
    });

    // handle pagination number
    const onPageChange = value => {
        if (value >= 1 && value <= 250) {
            setFilter(pre => ({ ...pre, perPage: value }));
        } else {
            setFilter(pre => ({ ...pre, perPage: "10" }));
        }
    };

    const onInputChange = (value) => {
        console.log(value)
        setFilter(pre => ({ ...pre, search:value }))
    }

    const handlePageClick = ({ selected }) => {
        // The selected parameter contains the selected page index
        const nextPage = selected + 1;
        setFilter(pre => ({ ...pre, currentPage: nextPage })); // Update the current page
    };
    return (
        <>
            <DashboardTitle title={"Users"} />

            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-start sm:justify-between items-start sm:items-center">
                {/* <div>
                    <Input
                        value={filter.search}
                        onChange={e => setFilter(pre => ({ ...pre, search: e.target.value }))}
                        type="text"
                        placeholder="Search by name"
                        className=" w-[300px] sm:w-[200px] lg:w-[350px]"
                    />
                </div> */}
                <SearchBar onInputChange={onInputChange} />

                <div className=" flex items-center gap-2">
                    <div className={`${isRoleLoading ? "hidden" : "block"}`}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className=" sm:not-sr-only sm:whitespace-nowrap">
                                        Roles
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Filter by role
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={filter.role}
                                    onValueChange={value =>
                                        setFilter(pre => ({
                                            ...pre,
                                            role: value,
                                        }))
                                    }
                                >
                                    {allRoles?.roles?.map((role, index) => (
                                        <DropdownMenuRadioItem
                                            key={index}
                                            value={role}
                                        >
                                            {role}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className=" sm:not-sr-only sm:whitespace-nowrap">
                                        Pages
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Filter by page
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={filter.perPage}
                                    onValueChange={onPageChange}
                                >
                                    <DropdownMenuRadioItem value="2">
                                        2
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="5">
                                        5
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="25">
                                        25
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="100">
                                        100
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Export
                        </span>
                    </Button> */}
                    <Button
                        onClick={() => dispatch(setCreateDialogOpen(true))}
                        size="sm"
                        className="h-8 gap-1"
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className=" sm:not-sr-only sm:whitespace-nowrap">
                            Add User
                        </span>
                    </Button>
                </div>
            </div>
            <UserTable users={data?.users?.data} isLoading={isLoading} />
            <PaginationUI
                total={data?.users?.total}
                to={data?.users?.items_per_page}
                pageCount={data?.users?.last_page}
                handlePageClick={handlePageClick}
            />
        </>
    );
};

export default UserPage;
