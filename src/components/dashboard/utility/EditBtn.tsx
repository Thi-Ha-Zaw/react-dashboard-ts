import React from "react";
import { FiEdit } from "react-icons/fi";

type handleEdit = () => void;

const EditBtn = ({handleEdit} : {handleEdit : handleEdit}) => {
    return (
        <div
            onClick={handleEdit}
            className=" p-2 rounded-full cursor-pointer bg-gray-800 dark:bg-slate-200 dark:hover:bg-slate-50 dark:hover:text-slate-900"
        >
            <FiEdit className="text-xs text-gray-50 dark:text-gray-600 " />
        </div>
    );
};

export default EditBtn;