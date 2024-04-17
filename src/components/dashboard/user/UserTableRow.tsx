import { TableCell, TableRow } from "@/components/ui/table";
import DeleteBtn from "../utility/DeleteBtn";
import EditBtn from "../utility/EditBtn";

import {
    setCurrentUser,
    setDeleteDialogOpen,
    setEditDialogOpen,
} from "../../../app/features/userSlice";
import { useAppDispatch } from "@/app/hooks";
import { User } from "./type";

const UserTableRow = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch();

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
