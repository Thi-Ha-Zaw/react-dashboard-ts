import React from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SkeletonTableBody from "../skeleton/SkeletonTableBody";
import UserTableRow from "./UserTableRow";
import UserDeleteDialog from "./UserDeleteDialog";
import UserCreateDialog from "./UserCreateDialog";
import UserEditDialog from "./UserEditDialog";
import { useSelector } from "react-redux";
import EmptySate from "../utility/EmptySate";

const UserTable = ({ users, isLoading }) => {
    const { isEditDialogOpen } = useSelector(state => state?.user);
    return (
        <div
            className=" rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <SkeletonTableBody cell={3} />
                    ) : (
                        <>
                            {users?.length > 0 ? (
                                users?.map(user => (
                                    <UserTableRow key={user?.id} user={user} />
                                ))
                            ) : (
                                <EmptySate colSpan={4} name={"users"} />
                            )}
                        </>
                    )}
                </TableBody>
            </Table>
            <UserCreateDialog />
            <UserDeleteDialog />
            {isEditDialogOpen && <UserEditDialog />}
        </div>
    );
};

export default UserTable;
