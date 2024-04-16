import React from "react";
import { FaTrash } from "react-icons/fa";

const DeleteBtn = ({handleDelete}) => {
    return (
        <div
            onClick={handleDelete}
            className=" p-2 rounded-full cursor-pointer  bg-gray-800 dark:bg-slate-100 dark:hover:bg-slate-50 dark:hover:text-slate-900"
        >
            <FaTrash className=" text-xs text-gray-50 dark:text-gray-700" />
        </div>
    );
};

export default DeleteBtn;