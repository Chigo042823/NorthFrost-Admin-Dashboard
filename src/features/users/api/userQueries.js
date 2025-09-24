import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addUser, deleteUser, updateUser, getUsers, getUser } from "./usersApi";
import toast from "react-hot-toast";

export const useUsers = () => {
    return useQuery({
            queryKey: ["users"],
            queryFn: getUsers
        })
}

export const useUser = (id) => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(id)
    })
}

export const useSaveUser = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();

    return useMutation(
        {
        mutationFn: async ({ data }) => {
            const promise = !data.user_id
                ? addUser(data)
                : updateUser(data);

            return toast.promise(promise, {
                loading: !data.user_id ? "Adding user..." : "Updating user...",
                success: !data.user_id ? "User added successfully!" : "User saved successfully!",
                error: "Failed to save user."
            })
        },
        onSuccess: async (result, vars) => {
            await queryClient.invalidateQueries(["users"]);

            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (err) => {
            console.log("Failed to save user: ", err);
        }
        }, 
    )
}

export const useDeleteUser = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async ({id}) => {

            return toast.promise(() => deleteUser(id), {
                loading: "Deleting user...",
                success: "User deleted successfully!",
                error: "Failed to delete user."
            })
            },
            onSuccess: async (result, vars) => {
                await queryClient.invalidateQueries("users")

                if(onSuccess) {
                    onSuccess()
                }
            },
            onError: (err) => {
                console.log("Failed to save user: ", err);
            }
        }
    )
}