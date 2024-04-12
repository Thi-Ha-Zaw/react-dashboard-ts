import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTableRow = ({ cell }) => {
    const skeletonCells = Array.from({ length: cell }, (v, i) => i);

    return (
        <TableRow>
            {skeletonCells.map((v, i) => (
                <TableCell key={i}>
                    <Skeleton className="h-2 bg-gray-200 w-[120px]" />
                </TableCell>
            ))}
            <TableCell className="flex gap-1">
                    <Skeleton className="h-9 w-9 bg-gray-200 rounded-full" />
                    <Skeleton className="h-9 w-9 bg-gray-200 rounded-full" />
                </TableCell>
        </TableRow>
    );
};

export default SkeletonTableRow;
