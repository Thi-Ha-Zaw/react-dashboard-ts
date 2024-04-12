import React from "react";
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

const Register = () => {
    return (
        <div className=" w-full h-screen flex justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your email below to register to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            className=" focus-visible:ring-1"
                            id="name"
                            type="name"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className=" focus-visible:ring-1"
                            id="email"
                            type="email"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            className=" focus-visible:ring-1"
                            id="password"
                            type="password"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirm password
                        </Label>
                        <Input
                            className=" focus-visible:ring-1"
                            id="password_confirmation"
                            type="password_confirmation"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Sign Up</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
