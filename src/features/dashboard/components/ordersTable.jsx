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
import { useOrderColumns } from "../hooks/useOrderColumns"

import OrderModal from "./orderModal";
import DeleteOrderAlert from "./deleteOrderAlert";
import { getOrders } from "../api/ordersApi";

import { deleteOrder } from "../api/ordersApi";
import { useModal } from "@/shared/contexts/modalContext";
import { useAlert } from "@/shared/contexts/alertContext";
import { useDeleteOrder } from "../api/orderQueries";
import { useOrders } from "../api/orderQueries";

export function OrdersTable() {
    const [formData, setFormData] = useState({});

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

    const qclient = useQueryClient();

    const modalContext = useModal();
    const alertContext = useAlert();

    const cols = useOrderColumns({
        onEdit: (data) => {
            setFormData(data);
            modalContext.setCurrentModal("orderForm")
            modalContext.setTitle("Edit Order");
        },
        onDelete: (data) => {
            setFormData(data);
            alertContext.setIsVisible(true);
            alertContext.setTitle("Delete Order");
            alertContext.setText("Are you sure you wish to delete " + data.name + " as your order?")
        },
    });

    const deleteOrderMutation = useDeleteOrder({
        onSuccess: () => {
            handleSuccess();
            alertContext.setIsVisible(false);
        }
    })

    function handleSuccess() {
        qclient.invalidateQueries(["orders"]);
        console.log("Orders updated...")   
    }

    if (isLoading) {
        return <p>Loading...</p>
    }   

    return (
        <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
            <OrderModal formData={formData} onSuccess={handleSuccess}/>
            <DeleteOrderAlert onClick={() => {
                deleteOrderMutation.mutate({id: formData.order_id})
            }
            }/>
            <TableToolbar setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} setFormData={setFormData} name={"order"}/>
            <DataTable 
                data={orders} 
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