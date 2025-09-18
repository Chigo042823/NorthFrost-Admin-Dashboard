import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

import { TableToolbar } from "@/shared/components/TableToolbar";
import { DataTable } from "@/shared/components/DataTable"
 
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
        <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
            <ClientModal formData={formData} onSuccess={handleSuccess}/>
            <DeleteClientAlert onClick={() => {
                deleteClientMutation.mutate({id: formData.client_id})
            }
            }/>
            <TableToolbar setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} setFormData={setFormData} />
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