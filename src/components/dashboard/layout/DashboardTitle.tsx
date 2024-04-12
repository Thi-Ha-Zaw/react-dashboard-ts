import React from "react";

const DashboardTitle = ({title}) => {
    return (
        <div className="flex items-center mb-2">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        </div>
    );
};

export default DashboardTitle;