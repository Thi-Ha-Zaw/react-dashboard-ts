import React from "react";
import { FaTrash } from "react-icons/fa";

const DeleteBtn = ({handleDelete}) => {
    return (
        <div
            onClick={handleDelete}
            className=" p-2 rounded-full cursor-pointer  bg-gray-800 dark:bg-gray-700"
        >
            <FaTrash className=" text-xs text-gray-50 " />
        </div>
    );
};

export default DeleteBtn;