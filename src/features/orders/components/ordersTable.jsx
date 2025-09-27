import { TableToolbar } from "@/shared/components/TableToolbar";
import { DataTable } from "@/shared/components/DataTable"

import { useState } from "react";
import { useOrderColumns } from "../hooks/useOrderColumns"
import { useOrders } from "../api/orderQueries";

export function OrdersTable() {

    const [sorting, setSorting] = useState([
        {
            id: "delivery_datetime",
            desc: true
        },
    ]);

    const {data: orders = [], isLoading} = useOrders();

    const [globalFilter, setGlobalFilter] = useState([]);
    
    const [columnFilters, setColumnFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
        unit: false
    });

    const cols = useOrderColumns();

    if (isLoading) {
        return <p>Loading...</p>
    } 

    return (
        <div className='container mx-auto px-4 py-2 rounded-lg'>
            <TableToolbar 
                name={"order"} 
                setGlobalFilter={setGlobalFilter} 
                setColumnFilter={setColumnFilter}
                globalFilter={globalFilter}
                willInsert={true}
            />            
            <DataTable
                data={orders} 
                columns={cols}
                sorting={sorting}
                setSorting={setSorting}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilter}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
            />
        </div>
    )

}