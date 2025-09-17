import { MoreHorizontal } from "lucide-react"

import { Button } from "../../../components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

import { deleteClient } from "../api/clientsApi"
import { useEffect } from "react"
import { useModal } from "@/shared/contexts/modalContext"

export const useClientColumns = ({onEdit, onDelete}) => { return [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.getValue("name")
            return(
                <>
                    {name}
                </>
                )
        }
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => {
            const address = row.getValue("address")
            return(
                <>
                    {address}
                </>
                )
        }
    },
    {
        accessorKey: "contactInfo",
        header: "ContactInfo",
        cell: ({ row }) => {
            const contactInfo = row.getValue("contactInfo")
            return(
                <>
                    {contactInfo}
                </>
                )
        }
    },
    {
        accessorKey: "totalOrders",
        header: "TotalOrders",
        cell: ({ row }) => {
            let totalOrders = row.getValue("totalOrders")
            if (!totalOrders) {
                totalOrders = 0
            }
            return(
                <>
                    {totalOrders}
                </>
                )
        }
    },
    {
        accessorKey: "pendingOrders",
        header: "PendingOrders",
        cell: ({ row }) => {
            let pendingOrders = row.getValue("pendingOrders")
            if (!pendingOrders) {
                pendingOrders = 0
            }
            return(
                <>
                    {pendingOrders}
                </>
                )
        }
    },
    {
        accessorKey: "note",
        header: "Note",
        cell: ({ row }) => {
            const note = row.getValue("note")
            return(
                <>
                    {note}
                </>
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                                onEdit(row.original);
                            }}>View Client Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={async () => {
                                onDelete(row.original);
                            }}>
                                Delete Client
                            </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
  },    
]
}