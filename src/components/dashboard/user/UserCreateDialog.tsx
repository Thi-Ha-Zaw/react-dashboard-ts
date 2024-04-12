import React, { useState } from "react";
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

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    useCreateUserMutation,
    useGetRolesQuery,
} from "../../../app/service/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import LoaderSvg from "../utility/LoaderSvg";
import Cookies from "js-cookie";
import { setCreateDialogOpen } from "../../../app/features/userSlice";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const UserCreateDialog = () => {
    const token = Cookies.get("token");
    const { register, handleSubmit, watch, reset } = useForm();

    const { data, isLoading: isroleLoading } = useGetRolesQuery(token);
    const [createUser, { isLoading }] = useCreateUserMutation();

    const { isCreateDialogOpen } = useSelector(state => state?.user);
    const dispatch = useDispatch();

    const { toast } = useToast();

    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const onNewUserAdded = async data => {
        const user = {
            name: data?.name,
            password: data?.password,
            role: value,
        };
        const respond = await createUser({ user, token });
        console.log(respond);
        if (respond?.data) {
            setErrors({})
            dispatch(setCreateDialogOpen(false));
            toast({
                title: "New user have been added",
            });
        } else if (respond.error) {
            setErrors(respond.error?.data?.errors);
        }
        setValue("");
        reset();
    };

    return (
        <Dialog
            open={isCreateDialogOpen}
            onOpenChange={() => dispatch(setCreateDialogOpen())}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onNewUserAdded)}>
                    <DialogHeader>
                        <DialogTitle>New User</DialogTitle>
                        <DialogDescription>
                            Make new user here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className=" grid gap-3 ps-2 pt-5">
                        <div>
                            <div className=" flex items-center gap-8">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    className={`${
                                        errors?.password && "border-red-500"
                                    } focus-visible:ring-1`}
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                />
                            </div>
                            {errors?.name && (
                                <p className=" text-end text-red-500 text-xs mt-1">
                                    {errors?.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className=" flex items-center gap-3">
                                <Label htmlFor="password">Password</Label>
                                <div className=" relative w-full">
                                    <Input
                                        className={`${
                                            errors?.password && "border-red-500"
                                        }`}
                                        id="password"
                                        {...register("password")}
                                        type={showPw ? "text" : "password"}
                                    />
                                    <p
                                        className=" cursor-pointer absolute top-3 right-3"
                                        onClick={() => setShowPw(!showPw)}
                                    >
                                        {showPw ? (
                                            <AiFillEye className=" text-lg text-gray-600" />
                                        ) : (
                                            <AiFillEyeInvisible className=" text-lg text-gray-600" />
                                        )}
                                    </p>
                                </div>
                            </div>
                            {errors?.password && (
                                <p className=" text-end text-red-500 text-xs mt-1">
                                    {errors?.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className=" flex items-center gap-8">
                                <Label className="" htmlFor="roles">
                                    Roles
                                </Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            
                                            className={` ${errors?.role && ' border-red-500'} w-full justify-between`}
                                        >
                                            {value
                                                ? data?.roles?.find(
                                                      role => role === value
                                                  )
                                                : "Select user..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search user..." />
                                            <CommandEmpty>
                                                No user found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                <CommandList>
                                                    {data?.roles?.map(
                                                        (role, index) => (
                                                            <CommandItem
                                                                key={index}
                                                                value={role}
                                                                onSelect={currentValue => {
                                                                    setValue(
                                                                        currentValue ===
                                                                            value
                                                                            ? ""
                                                                            : currentValue
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        value ===
                                                                            role
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {role}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandList>
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {errors?.role && (
                                <p className=" text-end text-red-500 text-xs mt-1">
                                    {errors?.role}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className=" mt-2">
                        <Button className=" flex items-center gap-2" type="submit" disabled={isLoading}>
                            <LoaderSvg isLoading={isLoading} />
                            <span>Save changes</span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserCreateDialog;
