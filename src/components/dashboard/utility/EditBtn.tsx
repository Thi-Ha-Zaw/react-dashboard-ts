import React from "react";
import { FiEdit } from "react-icons/fi";

const EditBtn = ({handleEdit}) => {
    return (
        <div
            onClick={handleEdit}
            className=" p-2 rounded-full cursor-pointer bg-gray-800 dark:bg-gray-700"
        >
            <FiEdit className="text-xs text-gray-50 " />
        </div>
    );
};

export default EditBtn;