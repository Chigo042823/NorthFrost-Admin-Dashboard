import { useModal } from "@/shared/contexts/modalContext";
import Select from "react-select";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useClientOrders, useClients } from "@/features/clients/api/clientQueries";
import { useAddInvoice, useInvoiceOrders } from "../api/invoiceQueries";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import { InvoiceItem } from "./InvoiceItem";
import { InvoiceDropdownOrder } from "./InvoiceDropdownOrder";
import { useLocation } from "react-router-dom";

export const InvoiceForm = ({data}) => {

    const {state} = useLocation();

    const {data: invoiceOrders, isInvoiceOrdersLoading} = useInvoiceOrders(state.invoice_id)

    const queryClient = useQueryClient();
    
    const [currClient, setCurrClient] = useState({})

    const {data: clients = [], isClientsLoading} = useClients();
    const [items, setItems] = useState([])


    useEffect(() => {
        if (invoiceOrders) {
            setItems(invoiceOrders)
            console.log(invoiceOrders)
        }
    }, [invoiceOrders])

    const {data: orders = [], isOrdersLoading} = useClientOrders(currClient.value);

    let isInsert = !data;

    const addInvoiceMutation = useAddInvoice({
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        }
    });

    const clientOptions = clients.map(client => ({
        value: client.client_id,
        label: client.name
    }));

    const amtDue = items.reduce((sum, item) => sum + (item.total_amount || 0), 0);

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        const body = Object.fromEntries(formData.entries());

        body.order_ids = items.map(item => item.id);
        body.total = amountDue;

        console.log(body)

        addInvoiceMutation.mutate({data: body})
    }

    return (
        <form onSubmit={handleSubmit} className="w-full" id="orderForm">
            <p className="font-semibold text-2xl text-stone-900">Invoice Details</p>
            <input type="hidden" name="client_id" id="client_id"
                defaultValue={state ? state.client_id : null}/>
            <div className="space-y-2 p-0.5 mt-1">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                            Bill to
                        </label>
                        <Select
                            defaultValue={state ? {value: state.client_id, label: state.name} : null}
                            isSearchable={true}
                            options={clientOptions}
                            onChange={(e) => {
                                console.log(e)
                                document.getElementById("client_id").value = e.value;
                                setCurrClient(e)
                            }}
                            className="mt-1 w-full rounded-md text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Due Date
                        </label>
                        <input
                        type="date"
                        name="due_date"
                        onChange={e => console.log(e.target.value)}
                        defaultValue={state ? state.due_date : null}
                        className="mt-1 w-full border rounded-md px-3 py-1.5 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-600">
                    Note
                    </label>
                    <textarea
                    name="invoice_note"
                    defaultValue={state ? state.invoice_note : ""}
                    rows={2}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                                focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
            </div>
            <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center">
                <span className="text-sm font-medium text-stone-600" >
                    Items
                </span>
                <span className="text-sm font-medium text-stone-600" >
                    Qty
                </span>
                <span className="text-sm font-medium text-stone-600" >
                    Price
                </span>
                <span className="text-sm font-medium text-stone-600" >
                    Total
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button type="button" className="px-2 py-0.5 hover:bg-stone-200 hover:text-gray-700 rounded-lg">+</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    {orders.length == 0 ? 
                        <div className="h-[12vh] w-[24vw] text-sm text-neutral-400 flex font-semibold justify-center items-center">
                            {!currClient.label ? "No Client Selected" : "No Existing orders for " + currClient.label}
                        </div>
                        :
                        <>
                            <DropdownMenuLabel className={"p-0.5"}>Client Orders</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {orders
                                .filter(order => !items.some(item => item.id === order.order_id))
                                .map(order => (
                                    <InvoiceDropdownOrder
                                    key={order.order_id}
                                    order={order}
                                    onClick={() =>
                                        setItems(prev => [
                                        ...prev,
                                        {
                                            order_id: order.order_id,
                                            quantity: order.quantity,
                                            unit: order.unit,
                                            total_amount: order.total_amount
                                        }
                                        ])
                                    }
                                    />
                                ))
                            }
                        </>
                    }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="space-y-2 p-2">
                {items.map((item) => (
                    <InvoiceItem
                    key={item.order_id}
                    item={item}
                    onChange={(id, changes) => {
                        setItems((prev) =>
                        prev.map((i) =>
                            i.order_id === id ? { ...i, ...changes} : i
                        )
                        );
                    }}
                    onRemove={(id) => setItems((prev) => prev.filter((i) => i.order_id !== id))}
                    />
                ))}
            </div>
            <div className="my-2 pl-4 pr-14 w-full flex justify-between text-stone-800 font-semibold">
                Amount Due (PHP) 
                <span id="amtDue">
                    {amtDue}
                </span>
            </div>
            <button
                type="button"
                onClick={() => {
                    setItems([
                        ...items,
                        {
                            order_id: "a",
                            price: 0,
                            quantity: 0,
                            total_amount: 0,
                            unit: "kg"
                        }
                    ])
                }
            }
                className="mt-2 ml-2 px-2 py-1 rounded-md border text-stone-600 hover:bg-stone-100"
            >
                + Add New Item
            </button>
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
                    // disabled={saveOrderMutation.isPending}
                >
                    Save Order
                </button>
            </div>
        </form>
    )
}