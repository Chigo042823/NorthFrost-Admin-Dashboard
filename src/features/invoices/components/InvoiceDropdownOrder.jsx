import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";

export const InvoiceDropdownOrder = ({onClick, order}) => {
    let bg = "";
    switch (order.status) {
        case "pending":
            bg =  "bg-stone-400";
            break;
        case "delivered":
            bg =  "bg-green-500";
            break;
        case "unpaid":
            bg =  "bg-red-500";
            break;            
    }
    return (
        <DropdownMenuItem>
            <button type="button" onClick={() => onClick()} className="space-x-1.5 py-0.5 flex">
                <span className="font-medium">{order.quantity} {order.unit}</span>
                <div className="space-x-0.5">
                    <span className="text-xs text-gray-500">
                        ₱{order.total_amount} · 
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(order.delivery_datetime).toDateString("en-PH")} · 
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(order.delivery_datetime).toLocaleTimeString("en-PH", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        })}
                    </span>
                </div>
                <InvoiceStatusBadge status={order.status} />
            </button>
        </DropdownMenuItem>
    )
}