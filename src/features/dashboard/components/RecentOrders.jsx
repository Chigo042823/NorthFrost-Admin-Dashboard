import { useOrderColumns } from "@/features/orders/hooks/useOrderColumns"
import { DataTable } from "@/shared/components/DataTable"
import { useState } from "react"
import { useOrders } from "@/features/orders/api/orderQueries"

export const RecentOrders = ({data}) => {

    if (!data) {
        return <p>Loading...</p>
    }

    const [sorting, setSorting] = useState([
        {
            id: "date",
            desc: true
        },
    ]);

    const {data: orders = [], isLoading} = useOrders();

    const [globalFilter, setGlobalFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
    });

    const columns = useOrderColumns();

    return (
        <div className="w-[calc(100%-16px)] h-[calc(100%-32px-16px)] overflow-auto my-2 px-2 mx-auto rounded-lg shadow overflow-y-auto">
            <DataTable 
                data={orders} 
                columns={columns}
                sorting={sorting}
                setSorting={setSorting}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
            />
        </div>
    )
}
