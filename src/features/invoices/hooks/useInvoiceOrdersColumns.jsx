import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/shared/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/dropdown-menu"

import { useModal } from "@/shared/contexts/modalContext"


import { useQueryClient } from "@tanstack/react-query"
import { useDeleteInvoice } from "../api/invoiceQueries"

export const useInvoicesColumns = () => { 

    const modalContext = useModal();
    const queryClient = useQueryClient();

    const deleteOrderMutation = useDeleteInvoice({
        onSuccess: () => {
            queryClient.invalidateQueries(["invoices"]);
            modalContext.setCurrentModal(null);
        }
    })

    const {onEdit, onDelete} = {
            onEdit: (data) => {
                modalContext.setModalData(data);
                modalContext.setCurrentModal("invoiceForm");
                modalContext.setTitle("Edit Invoice");
            },
            onDelete: (data) => {
                modalContext.setModalData(data);
                modalContext.setOnClick(() => {
                    deleteInvoiceMutation.mutate({id: data.invoice_id});
                });
                modalContext.setCurrentModal("confirmDelete");
                modalContext.setTitle("Delete Invoice");
                modalContext.setText("Are you sure you wish to delete " + data.name + "'s invoice?")
            },
    }
    
    return [
        {
            accessorKey: "delivery_datetime",
            header: "Date",
            cell: ({ row }) => {
                const date = new Date(row.original.delivery_datetime);
                return(
                    <div className="block">
                        {date.toLocaleTimeString("en-PH")}
                        <p className="text-stone-500 text-xs">{date.toLocaleDateString("en-PH")}</p>
                    </div>
                )
            }
        },
        {
            header: "Item",
            cell: ({}) => "Ice Order"
        },
        {
            accessorKey: "quantity",
            header: "Qty",
            cell: ({ row }) => {
                const order = parseFloat(row.getValue("quantity"));

                const total_amount = parseFloat(row.getValue("total_amount"));
                const fmt = new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                }).format(total_amount);

                return (
                    <>
                        <div>{order} kg</div>
                        <div className="md:hidden text-sm text-stone-400">{fmt}</div>
                    </>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status"
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => {
                const total_amount = parseFloat(row.getValue("total"));
                const fmt = new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                }).format(total_amount);

                return (
                    <div>{fmt}</div>
                )
            }
        },
        {
            id: "actions",  
            cell: ({ row }) => {
        
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-1 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                            onEdit(row.original)
                            console.log(row.original)
                            }}>
                                View Order Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                onDelete(row.original)
                                }}>
                                Delete Order
                            </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },    
    ]
}

