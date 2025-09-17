import { useEffect, useState } from "react";
import Select from "react-select";
import { getClients } from "../../features/clients/api/clientsApi";
import { addOrder, updateOrder } from "../../api/orders";

export const OrderForm = ({successHandler, loadingState, data, setFormVisible, text, isInsert}) => {

    const [clients, setClients] = useState([]);
    const [_, setIsLoading] = loadingState;

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            if (isInsert) {
                await addOrder(data)
            } else {
                await updateOrder(data.order_id, data)
            }
            await new Promise((resolve) => setTimeout(resolve, 800));
            successHandler();
        } catch (err) {
            if (err) {
                console.error(err)
            } else {
                console.log("Order saved!")
            }
        } finally {
            setIsLoading(false);
            setFormVisible(false);
        }
    }

    useEffect(() => {
        getClients().then(setClients).catch(console.error);
    }, [])

    const clientOptions = clients.map(client => ({
        value: client.client_id,
        label: client.name
    }));

    return (
                <form onSubmit={handleSubmit} className="space-y-3 mt-2" id="orderForm">
                    {
                        !isInsert ? 
                            <input type="text" name="order_id" className="hidden" defaultValue={data.order_id && !isInsert ? data.order_id : null}/> : ""
                    }
                    <input id="client_id" type="text" name="client_id" className="hidden" defaultValue={data.client_id && !isInsert ? data.client_id : null}/>
                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Client
                        </label>
                        <Select
                        defaultValue={!isInsert && data.name ? {value: data.client_id, label: data.name} : null}
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
                        defaultValue={data.location && !isInsert ? data.location : null}
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
                            defaultValue={data.order_qty && !isInsert ? data.order_qty : null}
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
                            defaultValue={data.amount && !isInsert ? data.amount : null}
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
                            data.date && !isInsert ? new Date(data.date).toISOString().slice(0, 16) : null
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
                        defaultValue={data.status && !isInsert ? data.status : null}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="pending">Pending</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                    <ModalButtons setFormVisible={setFormVisible} text={text}/>
                </form>
    )
}