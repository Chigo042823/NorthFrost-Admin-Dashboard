import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addClient, deleteClient, updateClient } from "./clientsApi";

export const useSaveClient = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async ({ data }) => {
                if (!data.client_id) {
                    console.log("Adding client");
                    return addClient(data);
                } else {
                    console.log("Updating client");
                    return updateClient(data);
                }
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
                console.log(id);
                return deleteClient(id);
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