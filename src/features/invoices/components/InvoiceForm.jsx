import { MdOutlinePlaylistAdd } from "react-icons/md";
import Select from "react-select";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useClientOrders, useClients } from "@/features/clients/api/clientQueries";
import { useAddInvoice, useInvoiceOrders, useLastInvoiceNumber, useUpdateInvoice } from "../api/invoiceQueries";

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
import { useLocation, useNavigate } from "react-router-dom";
import { fmtPhp } from "@/shared/utils/currency";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { useInvoiceData } from "../contexts/invoiceDataContext";
import { invoiceStatuses } from "../constansts/invoiceStatus";

export const InvoiceForm = () => {

    const {state} = useLocation();

    const {data: invoiceOrders, isInvoiceOrdersLoading} = useInvoiceOrders(state ? state.invoice_id : null)

    const queryClient = useQueryClient();
    
    const [currClient, setCurrClient] = useState({})

    const {data: clients = [], isClientsLoading} = useClients();

    const clientOptions = clients.map(client => ({
        value: client.client_id,
        label: client.name
    }));

    const {invoiceData, setInvoiceData} = useInvoiceData();

    useEffect(() => {
        if (state) {
            setInvoiceData(prev => ({
                ...prev,
                client_id: state.client_id,
                due_date: state.due_date?.slice(0, 10) || "", // ensure YYYY-MM-DD
                invoice_note: state.invoice_note || "",
                items: state.items || [],
                status: state.status || "pending",
            }));

            if (state?.client_id && clients.length) {
                const defaultClient = clientOptions.find(
                    c => c.value === state.client_id
                );
                setCurrClient(defaultClient);
            }
        }
    }, [state]);

    const [items, setItems] = useState([]);

    useEffect(() => {
        setInvoiceData(prev => ({...prev, items: items}));
    }, [items]);


    useEffect(() => {
        if (invoiceOrders) {
            setItems(invoiceOrders)
        }
    }, [invoiceOrders])

    const {data: orders = [], isOrdersLoading} = useClientOrders(currClient.value);

    const [status, setStatus] = useState(state ? state.status : "");

    // Mutations
    const addInvoiceMutation = useAddInvoice({
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        }
    });

    const updateInvoiceMutation = useUpdateInvoice({
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        }
    });

    const amtDue = items.reduce((sum, item) => sum + (item.total_amount || 0), 0);

    useEffect(() =>{
        setInvoiceData(prev => ({
            ...prev, amtDue: amtDue
        }))
    }, [amtDue]);

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        const body = Object.fromEntries(formData.entries());

        body.order_ids = items.map(item => item.order_id);
        body.total = amtDue;

        console.log(body)

        if (state) {
            body.invoice_id = state.invoice_id;
            body.status = status
            updateInvoiceMutation.mutate({data: body})
        } else {
            addInvoiceMutation.mutate({data: body})
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full" id="orderForm">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-2xl text-stone-900">Invoice Details</p>   
                {state &&
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <InvoiceStatusBadge status={status}/>    
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {invoiceStatuses.map(status => {
                                return <DropdownMenuItem key={status} onClick={() => setStatus(status)}>
                                        <InvoiceStatusBadge status={status}/>  
                                    </DropdownMenuItem>
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                }       
            </div>
            <input type="hidden" name="client_id" id="client_id"
                defaultValue={state ? state.client_id : ""}/>
            <div className="space-y-2 p-0.5 mt-1">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                            Bill to
                        </label>
                        <Select
                            isSearchable={true}
                            value={currClient}
                            options={clientOptions}
                            onChange={e => {
                                setCurrClient(e);
                                setItems([]);
                                document.getElementById("client_id").value = e.value
                                setInvoiceData(prev => ({ ...prev, client_id: e.value }));
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
                        value={invoiceData.due_date || ""}
                        onChange={e => setInvoiceData(prev => ({ ...prev, due_date: e.target.value }))}
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
                    value={invoiceData.invoice_note || ""}
                    onChange={e => setInvoiceData(prev => ({ ...prev, invoice_note: e.target.value }))}
                    rows={2}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                                focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center 
            mt-2 bg-neutral-50 p-2 rounded-lg
            text-sm font-semibold text-stone-700">
                <span className="" >
                    Items
                </span>
                <span className="" >
                    Qty
                </span>
                <span className="" >
                    Unit
                </span>
                <span className="" >
                    Price
                </span>
                <span className="" >
                    Total
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button type="button" className="p-1 hover:bg-neutral-100 hover:text-gray-900 rounded-lg text-xl">
                            <MdOutlinePlaylistAdd />
                        </button>
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
                                .filter(order => !items.some(item => item.order_id === order.order_id))
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
                                            price: 10,
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
                        ));

                        setInvoiceData(prev => ({
                        ...prev,
                        items: prev.items.map(i => (i.order_id === id ? { ...i, ...changes } : i))
                        }));
                    }}
                    onRemove={(id) => {
                        setItems((prev) => prev.filter((i) => i.order_id !== id));
                        setInvoiceData(prev => ({
                        ...prev,
                        items: prev.items.filter(i => i.order_id !== id)
                        }));
                    }}
                    />
                ))}
            </div>
            <div className="my-2 pl-4 pr-14 w-full flex justify-between text-stone-800 font-semibold">
                Amount Due (PHP) 
                <span id="amtDue" className="text-stone-800">
                    {fmtPhp(amtDue)}
                </span>
            </div>
            {/* <button
                type="button"
                onClick={() => {
                    setItems([
                        ...items,
                        {
                            order_id: "new" + items.length,
                            description: "",
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
            </button> */}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="submit"
                    className="w-full px-2 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    // disabled={saveOrderMutation.isPending}
                >
                    Save Invoice
                </button>
            </div>
        </form>
    )
}