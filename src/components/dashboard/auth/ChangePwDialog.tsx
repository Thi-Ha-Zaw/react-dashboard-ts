import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";


import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { setChangePwDialog } from "../../../app/features/authSlice";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useChangePasswordMutation } from "../../../app/service/authApi";
import LoaderSvg from "../utility/LoaderSvg";

const ChangePwDialog = () => {

    const token = Cookies.get("token")

    const { register, handleSubmit, watch, reset } = useForm();

    const { toast } = useToast();

    const dispatch = useDispatch();

    const { isChangePwDialog } = useSelector(state => state?.auth);

    const [isPwShow, setIsPwShow] = useState({
        oldPwShow: false,
        newPwShow: false,
        confirmPwShow : false
    })

    const [errors,setErrors] = useState({});

    const [changePassword,{isLoading}] = useChangePasswordMutation();

    
    
    const onPwEdited = async(data) => {
        console.log(data)
        const user = {
            old_password : data?.old_password,
            new_password : data?.new_password,
            new_password_confirmation : data?.confirm_password,
        }

        const respond = await changePassword({ token, user });
        console.log(respond)

        if (respond.data) {
            dispatch(setChangePwDialog(false));
            toast({
                title : "Change password successfully"
            })
        } else {
            setErrors(respond.error?.data?.errors)
        }

        reset();
        
    }
    return (
        <Dialog
            open={isChangePwDialog}
            onOpenChange={() => dispatch(setChangePwDialog())}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onPwEdited)}>
                    <DialogHeader>
                        <DialogTitle>Edit Password</DialogTitle>
                        <DialogDescription>
                            Make changes user here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className=" grid gap-3 pt-5">
                        <div>
                            <div className=" flex items-center gap-3">
                                <Label htmlFor="old_password">Old Password</Label>
                                <div className=" relative w-full">
                                    <Input
                                        className={`${
                                            errors?.old_password && "border-red-500"
                                        }`}
                                        id="old_password"
                                        {...register("old_password")}
                                        type={isPwShow.oldPwShow ? "text" : "password"}
                                    />
                                    <p
                                        className=" cursor-pointer absolute top-3 right-3"
                                        onClick={() => setIsPwShow(pre => ({...pre,oldPwShow : !isPwShow.oldPwShow}))}
                                    >
                                        {isPwShow.oldPwShow ? (
                                            <AiFillEye className=" text-lg text-gray-600" />
                                        ) : (
                                            <AiFillEyeInvisible className=" text-lg text-gray-600" />
                                        )}
                                    </p>
                                </div>
                            </div>
                            {errors?.old_password && (
                                <p className=" text-end text-red-500 text-xs mt-1">
                                    {errors?.old_password}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className=" flex items-center gap-3">
                                <Label htmlFor="new_password">New  Password</Label>
                                <div className=" relative w-full">
                                    <Input
                                        className={`${
                                            errors?.new_password && "border-red-500"
                                        }`}
                                        id="new_password"
                                        {...register("new_password")}
                                        type={isPwShow.newPwShow ? "text" : "password"}
                                    />
                                    <p
                                        className=" cursor-pointer absolute top-3 right-3"
                                        onClick={() => setIsPwShow(pre => ({...pre,newPwShow : !isPwShow.newPwShow}))}
                                    >
                                        {isPwShow.newPwShow ? (
                                            <AiFillEye className=" text-lg text-gray-600" />
                                        ) : (
                                            <AiFillEyeInvisible className=" text-lg text-gray-600" />
                                        )}
                                    </p>
                                </div>
                            </div>
                            {errors?.new_password && (
                                <p className=" text-end text-red-500 text-xs mt-1">
                                    {errors?.new_password}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className=" flex items-center ">
                                <Label htmlFor="confirm_password">Confirm Password</Label>
                                <div className=" relative w-full">
                                    <Input
                                        className={`${
                                            errors?.password_confirmation && "border-red-500"
                                        }`}
                                        id="confirm_password"
                                        {...register("confirm_password")}
                                        type={isPwShow.confirmPwShow ? "text" : "password"}
                                    />
                                    <p
                                        className=" cursor-pointer absolute top-3 right-3"
                                        onClick={() => setIsPwShow(pre => ({...pre,confirmPwShow : !isPwShow.confirmPwShow}))}
                                    >
                                        {isPwShow.confirmPwShow ? (
                                            <AiFillEye className=" text-lg text-gray-600" />
                                        ) : (
                                            <AiFillEyeInvisible className=" text-lg text-gray-600" />
                                        )}
                                    </p>
                                </div>
                            </div>
                            {errors?.password_confirmation && (
                                <p className=" text-end text-red-500 text-xs mt-1">
                                    {errors?.password_confirmation}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className=" mt-2">
                        <Button
                            className=" flex items-center gap-2"
                            type="submit"
                            disabled={isLoading}
                        >
                            <LoaderSvg isLoading={isLoading} />
                            <span>Save changes</span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePwDialog;
