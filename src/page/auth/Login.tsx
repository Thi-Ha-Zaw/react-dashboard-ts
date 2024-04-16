import  { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../app/service/authApi";
import { useToast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Cookies from 'js-cookie';
import LoaderSvg from "../../components/dashboard/utility/LoaderSvg";

// type casting
type Inputs = {
    name: string
    password: string,
}



const Login = () => {
    const { register, handleSubmit, reset } = useForm<Inputs>();

    const [login, { isLoading }] = useLoginMutation();

    const { toast } = useToast();

    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);

    const nav = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const userData = await login(data);
        if (userData?.data) {
            Cookies.set("token", userData?.data?.token);
            Cookies.set("user", JSON.stringify(userData?.data?.user));
            nav("/dashboard");
        } else if (userData.error) {
            setErrors(userData.error?.data?.errors);
            console.log(userData.error?.data?.errors)
            if (userData.error?.data?.errors?.[0]) {
                toast({
                    title: "Something wrong",
                    description: userData.error?.data?.errors?.[0],
                });
            }
        }
        reset();
    };

    return (
        <div className=" w-full h-screen flex justify-center items-center">
          
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your name below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    className=" focus-visible:ring-1"
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                />
                            </div>
                            {errors?.name && (
                                <p className=" text-red-500 text-xs mt-1">
                                    {errors?.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className=" relative">
                                    <Input
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
                                <p className=" text-red-500 text-xs mt-1">
                                    {errors?.password}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={isLoading}
                            className="w-full flex gap-2"
                        >
                            <LoaderSvg isLoading={isLoading} />
                            <span>Sign in</span>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default Login;
