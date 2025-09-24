import { TableToolbar } from "@/shared/components/TableToolbar";
import { DataTable } from "@/shared/components/DataTable"

import { useState } from "react";
import { useInvoicesColumns } from "../hooks/useInvoicesColumns"
import { useInvoices } from "../api/invoiceQueries";
import { useNavigate } from "react-router-dom";

export function InvoicesTable() {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const [sorting, setSorting] = useState([
        {
            id: "delivery_datetime",
            desc: true
        },
    ]);

    const [globalFilter, setGlobalFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
    });

    const cols = useInvoicesColumns();

    if (isLoading) {
        return <p>Loading...</p>
    }   

    return (
        <div className='container mx-auto px-4 py-2 rounded-lg'>
            <TableToolbar 
                name={"invoice"} 
                setGlobalFilter={setGlobalFilter} 
                globalFilter={globalFilter}
                willInsert={true}
                onClick={() => navigate("../form")}
            />            
            <DataTable
                data={invoices} 
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