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
} from "../../../components/ui/table"

import { Input } from "../../../components/ui/input";

import { useContext, useState } from "react";
import { useClientColumns } from "../hooks/useClientColumns"

import ClientModal from "./clientModal";
import DeleteClientAlert from "./deleteClientAlert";
import { getClients } from "../api/clientsApi";

import { deleteClient } from "../api/clientsApi";
import { useModal } from "@/shared/contexts/modalContext";
import { useAlert } from "@/shared/contexts/alertContext";
import { useDeleteClient } from "../api/clientQueries";

export function ClientsTable() {
    const [formData, setFormData] = useState({});

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

    const modalContext = useModal();
    const alertContext = useAlert();

    const cols = useClientColumns({
        onEdit: (data) => {
            setFormData(data);
            modalContext.setCurrentModal("clientForm")
            modalContext.setTitle("Edit Client");
        },
        onDelete: (data) => {
            setFormData(data);
            alertContext.setIsVisible(true);
            alertContext.setTitle("Delete Client");
            alertContext.setText("Are you sure you wish to delete " + data.name + " as your client?")
        },
    });

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

    const deleteClientMutation = useDeleteClient({
        onSuccess: () => {
            handleSuccess();
            alertContext.setIsVisible(false);
        }
    })

    function handleSuccess() {
        qclient.invalidateQueries(["clients"]);
        console.log("Clients updated...")
    }

    if (isLoading) {
        return <p>Loading...</p>
    }   

    return (
        <>
            <ClientModal formData={formData} onSuccess={handleSuccess}/>
            <DeleteClientAlert onClick={() => {
                deleteClientMutation.mutate({id: formData.client_id})
            }
            }/>
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
                            setFormData(null);
                            modalContext.setCurrentModal("clientForm");
                            modalContext.setTitle("Add Client");
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