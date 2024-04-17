import Lottie from "lottie-react";
import NotFoundAnimation from "../../lottie/FallBack.json";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className=" w-full h-screen flex flex-col justify-center items-center">
            <div className=" w-[600px]">
                <Lottie animationData={NotFoundAnimation} loop={true} />
            </div>
            <div>
                <Button size={"lg"} variant={"secondary"}>
                    <Link to={"/"}>Bact To Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
