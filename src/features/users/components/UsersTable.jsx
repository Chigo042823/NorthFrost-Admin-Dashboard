import { TableToolbar } from "@/shared/components/TableToolbar";
import { DataTable } from "@/shared/components/DataTable"

import { useState } from "react";
import { useUsersColumns } from "../hooks/useUsersColumns"
import { useUsers } from "../api/userQueries";

export function UsersTable() {

    const [sorting, setSorting] = useState([
        // {
        //     id: "pendingOrders",
        //     desc: true
        // },
    ]);

    const {data: users = [], isLoading} = useUsers();

    const [globalFilter, setGlobalFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
    });

    const cols = useUsersColumns();

    if (isLoading) {
        return <p>Loading...</p>
    }   

    return (
        <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
            <TableToolbar 
                name={"user"} 
                setGlobalFilter={setGlobalFilter} 
                globalFilter={globalFilter}
                willInsert={false}
            />
            <DataTable 
                data={users} 
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