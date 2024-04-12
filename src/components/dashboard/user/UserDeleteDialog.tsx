import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentUser,
    setDeleteDialogOpen,
} from "../../../app/features/userSlice";
import Cookies from "js-cookie";
import { useDeleteUserMutation } from "../../../app/service/userApi";
import { useToast } from "@/components/ui/use-toast";
import LoaderSvg from "../utility/LoaderSvg";

const UserDeleteDialog = () => {
    const token = Cookies.get("token");

    const [deleteUser, { isLoading }] = useDeleteUserMutation();

    const { isDeleteDialogOpen, currentUser } = useSelector(
        state => state?.user
    );
    const dispatch = useDispatch();

    const { toast } = useToast();

    const handleConfirm = async () => {
        console.log(currentUser);
        const respond = await deleteUser({ user: currentUser, token });
        console.log(respond.data);
        if (respond.data) {
            dispatch(setCurrentUser({}));
            dispatch(setDeleteDialogOpen(false));
            toast({
                title: "Deleted successfully ",
            });
        } else {
            toast({
                title: "Something worng ",
            });
        }
    };
    return (
        <AlertDialog open={isDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => dispatch(setDeleteDialogOpen(false))}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        className=" flex gap-2"
                        onClick={handleConfirm}
                    >
                        <LoaderSvg isLoading={isLoading} />
                        <span>Confirm</span>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default UserDeleteDialog;
