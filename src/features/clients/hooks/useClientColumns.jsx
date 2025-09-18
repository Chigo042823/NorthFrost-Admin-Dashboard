import { MoreHorizontal } from "lucide-react"

import { Button } from "../../../shared/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../shared/dropdown-menu"

import { useDeleteClient } from "../api/clientQueries"
import { useModal } from "@/shared/contexts/modalContext"
import { useQueryClient } from "@tanstack/react-query"

export const useClientColumns = () => { 
    
    const queryClient = useQueryClient();
    const modalContext = useModal();

    const deleteClientMutation = useDeleteClient({
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
            alertContext.setIsVisible(false);
        }
    })
    
    const {onEdit, onDelete} = {
        onEdit: (data) => {
            modalContext.setModalData(data);
            modalContext.setCurrentModal("clientForm")
            modalContext.setTitle("Edit Order");
        },
        onDelete: (data) => {
            modalContext.setModalData(data);
            modalContext.setOnClick(() => 
                deleteClientMutation.mutate({id: data.client_id})
            );
            modalContext.setCurrentModal("confirmDelete");
            modalContext.setTitle("Delete Client");
            modalContext.setText("Are you sure you wish to delete " + data.name + " as a client?")
        },
    };
   
    return [
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
                <div className="text-wrap">
                    {note}
                </div>
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