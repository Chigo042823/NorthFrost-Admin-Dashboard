import { useOrderColumns } from "@/features/orders/hooks/useOrderColumns"
import { DataTable } from "@/shared/components/DataTable"
import { useState } from "react"
import { useOrders } from "@/features/orders/api/orderQueries"
import { OrdersTable } from "@/features/orders/components/ordersTable"

export const RecentOrders = () => {

    const {data: orders = [], isLoading} = useOrders();

    if (!orders) {
        return <p>Loading...</p>
    }

    const [sorting, setSorting] = useState([
        {
            id: "date",
            desc: true
        },
    ]);

    const [globalFilter, setGlobalFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
    });

    const columns = useOrderColumns();

    return (
        <div className="w-[calc(100%-16px)] h-[calc(100%-32px-16px)] overflow-auto my-2 mx-auto rounded-lg shadow overflow-y-auto">
            <OrdersTable />
        </div>
    )
}
