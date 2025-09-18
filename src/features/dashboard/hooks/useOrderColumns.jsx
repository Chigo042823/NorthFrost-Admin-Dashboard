import { ArrowUpDown, MoreHorizontal, SortAsc } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const useOrderColumns = ({onEdit, onDelete}) => { return [
    {
        accessorKey: "name",
        header: "Client",
        cell: ({ row }) => {
            const client = row.getValue("name");
            const location = row.getValue("location");

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
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
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