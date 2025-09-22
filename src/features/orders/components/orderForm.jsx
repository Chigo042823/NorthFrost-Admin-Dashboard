import { useModal } from "@/shared/contexts/modalContext";
import { useSaveOrder } from "../api/orderQueries";
import Select from "react-select";
import { useClients } from "@/features/clients/api/clientQueries";
import { useQueryClient } from "@tanstack/react-query";
import { toLocalDatetimeInput } from "@/shared/utils/timezone";

export const OrderForm = ({data}) => {

    const queryClient = useQueryClient();

    const modalCtx = useModal();

    const {data: clients = [], isLoading} = useClients();

    let isInsert = !data;

    function onSuccess() {
        queryClient.invalidateQueries(["clients"]);
    }


    const saveOrderMutation = useSaveOrder({
        onSuccess: () => {
            modalCtx.setCurrentModal(null);
            onSuccess()
        }
    });

    const clientOptions = clients.map(client => ({
        value: client.client_id,
        label: client.name
    }));

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        const body = Object.fromEntries(formData.entries());

        if (!isInsert) {
            body.order_id = data.order_id;
        };

        body.delivery_datetime = new Date(body.delivery_datetime).toISOString();

        saveOrderMutation.mutate({data: body})
    }

    return (
        <form onSubmit={handleSubmit} className="mt-2" id="orderForm">
            <div className="space-y-2 overflow-y-auto max-h-[60vh] p-0.5">
                <input id="client_id" type="text" name="client_id" className="hidden" defaultValue={data ? data.client_id : null}/>
                <div>
                    <label className="block text-sm font-medium text-stone-600">
                    Client
                    </label>
                    <Select
                    defaultValue={data ? {value: data.client_id, label: data.name} : null}
                    isSearchable={true}
                    options={clientOptions}
                    onChange={(e) => {
                                document.getElementById("client_id").value = e.value
                            }}
                    className="mt-1 w-full rounded-md text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-600">
                    Location
                    </label>
                    <input
                    type="text"
                    name="location"
                    defaultValue={data ? data.location : null}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-stone-600">
                        Order Qty. (kg)
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        defaultValue={data ? data.quantity : null}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-stone-600">
                        Amount (₱)
                    </label>
                    <input
                        type="number"
                        name="total_amount"
                        defaultValue={data ? data.total_amount : null}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Date
                        </label>
                        <input
                        type="datetime-local"
                        name="delivery_datetime"
                        onChange={e => console.log(e.target.value)}
                        defaultValue={
                            data ? toLocalDatetimeInput(data.delivery_datetime) : null
                        }
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Status
                        </label>
                        <select
                        name="status"
                        defaultValue={data ? data.status : null}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="pending">Pending</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-600">
                    Note
                    </label>
                    <textarea
                    name="note"
                    defaultValue={data ? data.order_note : ""}
                    rows={3}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                                focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={() => modalCtx.setCurrentModal(null)}
                    className="px-4 py-2 rounded-md border text-stone-600 hover:bg-stone-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                    disabled={saveOrderMutation.isPending}
                >
                    Save Order
                </button>
            </div>
        </form>
    )
}