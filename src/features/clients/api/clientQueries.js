import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addClient, deleteClient, updateClient } from "./clientsApi";
import toast from "react-hot-toast";

export const useSaveClient = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();

    return useMutation(
        {
        mutationFn: async ({ data }) => {
            const promise = !data.client_id
                ? addClient(data)
                : updateClient(data);

            return toast.promise(promise, {
                loading: !data.client_id ? "Adding client..." : "Updating client...",
                success: !data.client_id ? "Client added successfully!" : "Client saved successfully!",
                error: "Failed to save client."
            })
        },
        onSuccess: async (result, vars) => {
            await queryClient.invalidateQueries(["clients"]);

            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (err) => {
            console.log("Failed to save client: ", err);
        }
        }, 
    )
}

export const useDeleteClient = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async ({id}) => {

            return toast.promise(() => deleteClient(id), {
                loading: "Deleting client...",
                success: "Client deleted successfully!",
                error: "Failed to delete client."
            })
            },
            onSuccess: async (result, vars) => {
                await queryClient.invalidateQueries("clients")

                if(onSuccess) {
                    onSuccess()
                }
            },
            onError: (err) => {
                console.log("Failed to save client: ", err);
            }
        }
    )
}