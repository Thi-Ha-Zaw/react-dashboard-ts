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
import { useToast } from "@/components/ui/use-toast";
import LoaderSvg from "../utility/LoaderSvg";
import Cookies from "js-cookie";
import { setCreateDialogOpen } from "../../../app/features/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ErrorMessage from "@/components/error/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Errors, User } from "./type";





const UserCreateDialog = () => {
    const token = Cookies.get("token");
    const { register, handleSubmit, watch, reset } = useForm<Partial<User>>();

    const { data, isLoading: isroleLoading } = useGetRolesQuery(token);
    const [createUser, { isLoading }] = useCreateUserMutation();

    const { isCreateDialogOpen } = useAppSelector(state => state?.user);
    const dispatch = useAppDispatch();

    const { toast } = useToast();

    const [errors, setErrors] = useState<Errors>({});
    const [showPw, setShowPw] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const onNewUserAdded: SubmitHandler<User> = async data => {
        const user = {
            name: data?.name,
            password: data?.password,
            role: value,
        };
        const respond = await createUser({ user, token });
        console.log(respond);
        if (respond.data) {
            setErrors({});
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
            onOpenChange={() => dispatch(setCreateDialogOpen(false))}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onNewUserAdded)}>
                    <DialogHeader>
                        <DialogTitle>New User</DialogTitle>
                        <DialogDescription>
                            Make new user here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className=" grid gap-4 sm:gap-3 ps-0 sm:ps-2 pt-5">
                        <div>
                            <div className=" flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
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
                            {errors?.name && <ErrorMessage message={errors?.name} />}
                        </div>
                        <div>
                            <div className=" flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
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
                            {errors?.password && <ErrorMessage message={errors?.password} />}
                        </div>

                        <div>
                            <div className=" flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                                <Label className="" htmlFor="roles">
                                    Roles
                                </Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className={` ${
                                                errors?.role &&
                                                " border-red-500"
                                            } w-full justify-between dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-400`}
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
                            {errors?.role && <ErrorMessage message={errors?.role} />}
                        </div>
                    </div>

                    <DialogFooter className=" mt-4 sm:mt-2 ">
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

export default UserCreateDialog;
