import { ArrowUpDown, MoreHorizontal, SortAsc } from "lucide-react"

import { Button } from "../../ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};


export const columns = ({setModalVisible, setModalData}) => { return [
    {
        accessorKey: "client",
        header: "Client",
        cell: ({ row }) => {
            const client = row.getValue("client");
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
        accessorKey: "order",
        header: "Order",
        cell: ({ row }) => {
            const order = parseFloat(row.getValue("order"));

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
            const date = row.original.date;
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
                        setModalData(row.original);
                        setModalVisible(true)
                        }}>View Order Details</DropdownMenuItem>
                    <DropdownMenuItem>View Customer Details</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        },
  },    
]
}