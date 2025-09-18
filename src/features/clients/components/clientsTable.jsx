import { TableToolbar } from "@/shared/components/TableToolbar";
import { DataTable } from "@/shared/components/DataTable"

import { useState } from "react";
import { useClientColumns } from "../hooks/useClientColumns"
import { useClients } from "../api/clientQueries";

export function ClientsTable() {

    const [sorting, setSorting] = useState([
        {
            id: "pendingOrders",
            desc: true
        },
    ]);

    const {data: clients = [], isLoading} = useClients();

    const [globalFilter, setGlobalFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
    });

    const cols = useClientColumns();

    if (isLoading) {
        return <p>Loading...</p>
    }   

    return (
        <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
            <TableToolbar name={"client"} setGlobalFilter={setGlobalFilter} globalFilter={globalFilter}/>
            <DataTable 
                data={clients} 
                columns={cols}
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