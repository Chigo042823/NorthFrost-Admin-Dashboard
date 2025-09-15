import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"

import { Input } from "../../ui/input";

import { useEffect, useState } from "react";
import { columns } from "./columns"

import { Modal } from "../../Modals/modal";
import { ClientForm } from "../../Modals/clientForm";
import { ConfirmDeleteModal } from "../../Modals/confirmDeleteModal";
import { getClients } from "../../../../api/clients";

import { deleteClient } from "../../../../api/clients";

export function DataTable() {
    const [isInsert, setIsInsert] = useState(false);

    const [isFormVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({});

    const [isConfirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const [sorting, setSorting] = useState([
        {
            id: "pendingOrders",
            desc: true
        },
    ]);

    const { data: clients = [], isLoading } = useQuery({
        queryKey: ["clients"],
        queryFn: getClients
    })

    const [globalFilter, setGlobalFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
    });

    const qclient = useQueryClient();

    const cols = columns({setFormVisible, setFormData, setIsInsert, setConfirmDeleteVisible});

    const table = useReactTable({
        data: clients,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
        // debugAll: true,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            globalFilter,
            columnVisibility
        }
    });

    function handleSuccess() {
        qclient.invalidateQueries(["clients"]);
    }

    if (isLoading) {
        return <p>Loading...</p>
    }   

    return (
        <>
            {
                isFormVisible && 
                    <Modal title={"Client"} setFormVisible={setFormVisible}>
                        <ClientForm data={formData} isInsert={isInsert} setFormVisible={setFormVisible} successHandler={handleSuccess}/>
                    </Modal> 
            }
            {
                isConfirmDeleteVisible &&
                    <ConfirmDeleteModal 
                        warningString={"Are you sure you wish to delete " + formData.name + " as a client?"} 
                        title={"Delete Client Confirmation"} 
                        deletefn={deleteClient}
                        successHandler={handleSuccess} 
                        setConfirmDeleteVisible={setConfirmDeleteVisible}
                        deleteId={formData.client_id}    
                    />
            }
            <div className="flex items-center py-2 justify-between">
                <Input  
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                    className="w-[30%] min-w-[15rem]"
                    />
                    <button className="bg-indigo-500 p-2 rounded-lg text-gray-50
                        hover:transform-[scale(1.05)] hover:bg-indigo-600 hover:text-indigo-100 transition-all ease-in-out"
                        onClick={() => {
                            setIsInsert(true);
                            setFormVisible(true);
                        }}
                        >
                        Add Client
                    </button>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups()?.map(group => (
                            <TableRow key={group.id}>
                                {group.headers.map(header => (
                                    <TableHead key={header.id} className={header.index == 4 && "w-4"}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell className={cell.id == "actions" && "w-4"} key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                        )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )

}