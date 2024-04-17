import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import SkeletonTableBody from "../../components/dashboard/skeleton/SkeletonTableBody";

import DashboardTitle from "../../components/dashboard/layout/DashboardTitle";

const DashboardIndex = () => {
    return (
        <>
            <DashboardTitle title={"Inventory"} />
            <div
                className=" rounded-lg border border-dashed shadow-sm"
                x-chunk="dashboard-02-chunk-1"
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <SkeletonTableBody cell={4} />
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default DashboardIndex;
