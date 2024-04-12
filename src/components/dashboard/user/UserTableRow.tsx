import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteBtn from "../utility/DeleteBtn";
import EditBtn from "../utility/EditBtn";
import { useDispatch } from "react-redux";
import { setCurrentUser, setDeleteDialogOpen, setEditDialogOpen } from "../../../app/features/userSlice";

const UserTableRow = ({ user }) => {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setCurrentUser(user));
        dispatch(setEditDialogOpen(true));
    };

    const handleDelete = () => {
        dispatch(setCurrentUser(user));
        dispatch(setDeleteDialogOpen(true));
    };
    return (
        <TableRow>
            <TableCell>{user?.id}</TableCell>
            <TableCell>{user?.name}</TableCell>
            <TableCell>{user?.role[0]}</TableCell>
            <TableCell className=" flex gap-1">
                <EditBtn handleEdit={handleEdit} />
                <DeleteBtn handleDelete={handleDelete} />
            </TableCell>
        </TableRow>
    );
};

export default UserTableRow;
