import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

const EmptySate = ({ colSpan, name }) => {
    return (
        <TableRow>
            <TableCell className=" text-center" colSpan={colSpan}>There is no {name}</TableCell>
        </TableRow>
    );
};

export default EmptySate;
