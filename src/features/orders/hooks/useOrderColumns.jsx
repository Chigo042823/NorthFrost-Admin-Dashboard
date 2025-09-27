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
            accessorKey: "unit"
        },
        {
            accessorKey: "location",
            header: "Location"
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: ({ row }) => {
                const order = parseFloat(row.getValue("quantity"));
                const unit = row.getValue("unit");

                const total_amount = parseFloat(row.getValue("total_amount"));
                const fmt = new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                }).format(total_amount);

                return (
                    <>
                        <div>{order} {unit}</div>
                        <div className="md:hidden text-sm text-stone-400">{fmt}</div>
                    </>
                )
            }
        },
        {
            accessorKey: "total_amount",
            header: () => (<div className="hidden md:table-cell">total_amount</div>),
            cell: ({ row }) => {
                const total_amount = parseFloat(row.getValue("total_amount"));
                const fmt = new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                }).format(total_amount);

                return (
                    <div className="hidden md:table-cell">{fmt}</div>
                )
            }
        },
        {
            accessorKey: "delivery_datetime",
            header: ({ column }) => {
                return (
                    <Button 
                        variant="ghost" 
                        onClick={() => {
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }}
                    >
                        Delivery Time
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.original.delivery_datetime);
                return(
                    <div className="block">
                        {date.toLocaleTimeString("en-PH")}
                        <p className="text-stone-500 text-xs">{date.toLocaleDateString("en-PH")}</p>
                    </div>
                )
            },
            filterFn: (row, columnId, filterValue) => {
                if (!filterValue) return true;
                const date = new Date(row.getValue(columnId));
                const month = date.getMonth() + 1; 
                const year = date.getFullYear();
                return (
                    month === filterValue.month &&
                    year === filterValue.year
                );
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({row}) => {
                return (
                    <div className="capitalize">{row.original.status}</div>
                )
            }
        },
        {
            accessorKey: "order_note",
            header: "Note"
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

