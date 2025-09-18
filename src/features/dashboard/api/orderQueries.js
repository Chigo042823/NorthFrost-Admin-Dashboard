import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { addOrder, deleteOrder, updateOrder, getOrders } from "./ordersApi";
import toast from "react-hot-toast";

export const useOrders = () => {
    return useQuery({
            queryKey: ["orders"],
            queryFn: getOrders
        })
}

export const useSaveOrder = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();

    return useMutation(
        {
        mutationFn: async ({ data }) => {
            const promise = !data.order_id
                ? addOrder(data)
                : updateOrder(data);

            return toast.promise(promise, {
                loading: !data.order_id ? "Adding order" : "Updating order",
                success: !data.order_id ? "Order added successfully!" : "Order saved successfully!",
                error: "Failed to save order"
            })
        },
        onSuccess: async (result, vars) => {
            await queryClient.invalidateQueries(["orders"]);

            if (onSuccess) {
                onSuccess()
            }
        },
        onError: (err) => {
            console.log("Failed to save order: ", err);
        }
        }, 
    )
}

export const useDeleteOrder = ({
    onSuccess
}) => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async ({id}) => {

            return toast.promise(() => deleteOrder(id), {
                loading: "Deleting order",
                success: "Order deleted successfully!",
                error: "Failed to delete order"
            })
            },
            onSuccess: async (result, vars) => {
                await queryClient.invalidateQueries("orders")

                if(onSuccess) {
                    onSuccess()
                }
            },
            onError: (err) => {
                console.log("Failed to save order: ", err);
            }
        }
    )
}