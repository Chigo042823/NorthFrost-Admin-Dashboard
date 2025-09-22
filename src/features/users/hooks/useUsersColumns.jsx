import { MoreHorizontal } from "lucide-react"

import { Button } from "../../../shared/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../shared/dropdown-menu"

import { useDeleteUser } from "../api/userQueries"
import { useModal } from "@/shared/contexts/modalContext"
import { useQueryClient } from "@tanstack/react-query"

export const useUsersColumns = () => { 
    
    const queryClient = useQueryClient();
    const modalContext = useModal();

    const deleteUserMutation = useDeleteUser({
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            modalContext.setCurrentModal(null)
        }
    })
    
    const {onEdit, onDelete} = {
        onEdit: (data) => {
            modalContext.setModalData(data);
            modalContext.setCurrentModal("userForm")
            modalContext.setTitle("Edit user");
        },
        onDelete: (data) => {
            modalContext.setModalData(data);
            modalContext.setOnClick(() => 
                deleteUserMutation.mutate({id: data.user_id})
            );
            modalContext.setCurrentModal("confirmDelete");
            modalContext.setTitle("Delete User");
            modalContext.setText("Are you sure you wish to delete " + data.name + " as a user?")
        },
    };
   
    return [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => {
            const username = row.getValue("username")
            return(
                <>
                    {username}
                </>
                )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.getValue("email")
            return(
                <>
                    {email}
                </>
                )
        }
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const Role = row.getValue("role")
            return(
                <>
                    {Role}
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
                        <DropdownMenuItem onClick={() => {
                                onEdit(row.original);
                            }}>View User Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={async () => {
                                onDelete(row.original);
                            }}>
                                Delete User
                            </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
  },    
]
}