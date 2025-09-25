import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { addClient, deleteClient, updateClient, getClients, getClient, getClientOrders } from "./clientsApi";
import toast from "react-hot-toast";
import { useToken } from "@/features/auth/hooks/useToken";

export const useClients = () => {
    const [token, _] = useToken()
    return useQuery({
            queryKey: ["clients"],
            queryFn: () => getClients(token)
        })
}

export const useClient = (id) => {
    const [token, _] = useToken()
    return useQuery({
            queryKey: ["client"],
            queryFn: () => getClient(id, token),
            enabled: !!id
        })
}

export const useClientOrders = (id, options = {}) => {
    const [token, _] = useToken()
    return useQuery({
            queryKey: ["clientOrders", id],
            queryFn: () => getClientOrders(id, token),
            enabled: !!id,
            ...options
        })
}

export const useSaveClient = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();
    const [token, _] = useToken()

    return useMutation(
        {
        mutationFn: async ({ data }) => {
            const promise = !data.client_id
                ? addClient(data, token)
                : updateClient(data, token);

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
    const [token, _] = useToken()

    return useMutation(
        {
            mutationFn: async ({id}) => {

            return toast.promise(() => deleteClient(id, token), {
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