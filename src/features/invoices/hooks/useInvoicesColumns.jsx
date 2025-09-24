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

import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

export const useInvoicesColumns = () => { 
    const navigate = useNavigate();
    const modalContext = useModal();
    const queryClient = useQueryClient();

    const deleteInvoiceMutation = useDeleteInvoice({
        onSuccess: () => {
            queryClient.invalidateQueries(["invoices"]);
            modalContext.setCurrentModal(null);
        }
    })

    const {onEdit, onDelete} = {
            onEdit: (data) => {
                navigate("../form", {
                    state: data
                })
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
            accessorKey: "invoice_no",
            header: "INV"
        },
        {
            accessorKey: "name",
            header: "Client",
            cell: ({ row }) => {
                const client = row.getValue("name");
                const address = row.original.address

                return (
                    <>
                        {client}
                        <div className="text-stone-400 text-sm">
                        {address}
                        </div>
                    </>
                )
            }
        },
        {
            accessorKey: "due_date",
            header: "Due",
            cell: ({row}) => {
                const val = row.original.due_date;
                const fmt = new Date(val).toDateString();
                return <div>{fmt}</div>
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({row}) => {
                const val = row.original.status;
                return <Badge>{val}</Badge>
            }
        },
        {
            accessorKey: "total",
            header: "Amount",
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
                <div className="flex justify-end">
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
                                }}>
                                    Edit Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    onDelete(row.original)
                                    }}>
                                    Delete Invoice
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
            },
        },    
    ]
}

