import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../lottie/loader.json";

const Loading = () => {
    return (
        <div className=" w-full h-screen flex justify-center items-center">
            <Lottie animationData={LoadingAnimation} loop={true} />
        </div>
    );
};

export default Loading;
