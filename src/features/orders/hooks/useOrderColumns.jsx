import { ArrowUpDown, MoreHorizontal, SortAsc } from "lucide-react"

import { Button } from "@/shared/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/dropdown-menu"

import { useModal } from "@/shared/contexts/modalContext"

import { useDeleteOrder } from "../api/orderQueries"
import { useQueryClient } from "@tanstack/react-query"

export const useOrderColumns = () => { 

    const modalContext = useModal();
    const queryClient = useQueryClient();

    const deleteOrderMutation = useDeleteOrder({
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            modalContext.setCurrentModal(null);
        }
    })

    const {onEdit, onDelete} = {
            onEdit: (data) => {
                modalContext.setModalData(data);
                modalContext.setCurrentModal("orderForm");
                modalContext.setTitle("Edit Order");
            },
            onDelete: (data) => {
                modalContext.setModalData(data);
                modalContext.setOnClick(() => {
                    deleteOrderMutation.mutate({id: data.order_id});
                });
                modalContext.setCurrentModal("confirmDelete");
                modalContext.setTitle("Delete Order");
                modalContext.setText("Are you sure you wish to delete " + data.name + "'s order?")
            },
    }
    
    return [
        {
            accessorKey: "name",
            header: "Client",
            cell: ({ row }) => {
                const client = row.getValue("name");
                const location = row.original.address

                return (
                    <>
                        {client}
                        <div className="text-stone-400 text-sm">
                        {location}
                        </div>
                    </>
                )
            }
        },
        {
            accessorKey: "location",
            header: "Location"
        },
        {
            accessorKey: "order_qty",
            header: "Order Qty.",
            cell: ({ row }) => {
                const order = parseFloat(row.getValue("order_qty"));

                const amount = parseFloat(row.getValue("amount"));
                const fmt = new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                }).format(amount);

                return (
                    <>
                        <div>{order} kg</div>
                        <div className="md:hidden text-sm text-stone-400">{fmt}</div>
                    </>
                )
            }
        },
        {
            accessorKey: "amount",
            header: () => (<div className="hidden md:table-cell">Amount</div>),
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"));
                const fmt = new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                }).format(amount);

                return (
                    <div className="hidden md:table-cell">{fmt}</div>
                )
            }
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button 
                        variant="ghost" 
                        onClick={() => {
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }}
                    >
                        Date
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.original.date);
                return(date.toLocaleDateString("en-US"))
            }
        },
        {
            accessorKey: "status",
            header: "Status"
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

