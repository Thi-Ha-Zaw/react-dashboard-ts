import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

type Props = {
    colSpan: number,
    name : string
}

const EmptySate = ({ colSpan, name } : Props) => {
    return (
        <TableRow>
            <TableCell className=" text-center" colSpan={colSpan}>There is no {name}</TableCell>
        </TableRow>
    );
};

export default EmptySate;
