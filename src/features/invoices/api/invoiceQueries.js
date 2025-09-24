import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { addInvoice, deleteInvoice, updateInvoice, getInvoices, getInvoiceOrders } from "./invoicesApi";
import toast from "react-hot-toast";
import { useToken } from "@/features/auth/hooks/useToken";

export const useInvoices = () => {
    const [token, _] = useToken()
    return useQuery({
            queryKey: ["invoices"],
            queryFn: () => getInvoices(token)
        })
}

export const useInvoiceOrders = (id) => {
    const [token, _] = useToken()
    return useQuery({
            queryKey: ["invoiceOrders", id],
            queryFn: () => getInvoiceOrders(id, token),
            enabled: !!id
        })
}

export const useAddInvoice = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();
    const [token, _] = useToken()

    return useMutation(
        {
        mutationFn: async ({ data }) => {

            return toast.promise(async () => addInvoice(data, token), {
                loading: "Adding new invoice...",
                success: "Invoice added successfully",
                error: "Failed to add Invoice"
            })
        },
        onSuccess: async (result, vars) => {
            await queryClient.invalidateQueries(["invoices"]);

            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (err) => {
            console.log("Failed to add invoice: ", err);
        }
        }, 
    )
}

export const useUpdateInvoice = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();
    const [token, _] = useToken()

    return useMutation(
        {
        mutationFn: async ({ data }) => {

            return toast.promise(async () => updateInvoice(data, token), {
                loading: "Updating new invoice...",
                success: "Invoice updated successfully",
                error: "Failed to update Invoice"
            })
        },
        onSuccess: async (result, vars) => {
            await queryClient.invalidateQueries(["invoices"]);

            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (err) => {
            console.log("Failed to update invoice: ", err);
        }
        }, 
    )
}

export const useDeleteInvoice = ({
    onSuccess
}) => {
    const [token, _] = useToken()

    return useMutation(
        {
            mutationFn: async ({id}) => {

            return toast.promise(() => deleteInvoice(id, token), {
                loading: "Deleting invoice...",
                success: "Invoice deleted successfully!",
                error: "Failed to delete invoice."
            })
            },
            onSuccess: async (result, vars) => {
                if(onSuccess) {
                    onSuccess()
                }
            },
            onError: (err) => {
                console.log("Failed to save invoice: ", err);
            }
        }
    )
}