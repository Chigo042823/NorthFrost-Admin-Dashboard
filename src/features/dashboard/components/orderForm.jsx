import { useModal } from "@/shared/contexts/modalContext";
import { useSaveOrder } from "../api/orderQueries";
import Select from "react-select";
import { useClients } from "@/features/clients/api/clientQueries";

export const OrderForm = ({data, onSuccess}) => {
    const modalCtx = useModal();

    const {data: clients = [], isLoading} = useClients();

    let isInsert = !data;

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
        saveOrderMutation.mutate({data: body})
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mt-2" id="orderForm">
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
                    name="order_qty"
                    defaultValue={data ? data.order_qty : null}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-stone-600">
                    Amount (₱)
                </label>
                <input
                    type="number"
                    name="amount"
                    defaultValue={data ? data.amount : null}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Date
                </label>
                <input
                type="datetime-local"
                name="date"
                onChange={e => console.log(e.target.value)}
                defaultValue={
                    data ? new Date(data.date).toISOString().slice(0, 16) : null
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