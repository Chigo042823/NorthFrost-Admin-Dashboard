import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/shared/table";
import { useInvoiceData } from "../contexts/invoiceDataContext";
import { useClient } from "@/features/clients/api/clientQueries";
import { useLocation } from "react-router-dom";
import { fmtPhp } from "@/shared/utils/currency";
import { useInvoice } from "../api/invoiceQueries";
import { useLastInvoiceNumber } from "../api/invoiceQueries";

export const InvoicePreview = () => {
    const {state} = useLocation();

    const {invoiceData} = useInvoiceData();
    const {data: lastInvoiceNumber} = useLastInvoiceNumber();

    const {data: invoice = {}} = useInvoice(state ? state.invoice_id : null);

    const {data: client = {}} = useClient(invoiceData ? invoiceData.client_id : null);

    return (
        <div className="p-4 bg-white h-full mx-auto" id="invoicePreview">
            <div className="flex justify-between items-center border-b border-stone-300 pb-5 pr-2">
                <img src="/northfrost-logo.jpg" alt="Logo" className="h-16 object-contain" />
                <div className="text-right">
                    <p className="text-3xl font-bold text-neutral-800">INVOICE</p>
                    <p className="text-sm font-medium text-neutral-600">INV-2025-{state ? state.invoice_no : (lastInvoiceNumber + 1).toString().padStart(4, '0')}</p>
                </div>
            </div>
            <div className="flex justify-between p-4 pt-6 pb-8 
            text-stone-500 font-semibold text-xs border-b border-stone-300">
                <div className="">
                    <p className="text-stone-800 mb-2 text-sm">Recipient</p>
                    <p className="">{client.name}</p>
                    <p className="">{client.address}</p>
                    <p>{client.contact_info}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-stone-800">Issue Date</p>
                    <p className="mb-6">{invoice.issue_date ? new Date(invoice.issue_date).toDateString() : new Date().toDateString()}</p>
                    <p className="text-sm text-stone-800">Due Date</p>
                    <p>{invoiceData ? invoiceData.due_date ? new Date(invoiceData.due_date).toDateString() : "" : ""}</p>
                </div>
            </div>
            <Table className="w-full mt-4">
                <TableHeader className="text-center text-stone-800 font-semibold pb-4 p-4">
                    <TableRow>
                        <TableHead className="text-left">Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-sm text-stone-700 text-center">
                    {invoiceData && invoiceData.items && invoiceData.items.map(item => {
                        return <TableRow key={item.order_id}>
                            <TableCell className="text-left">Purified Ice Cubes</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{fmtPhp(item.price)}</TableCell>
                            <TableCell>{fmtPhp(item.total_amount)}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            <div className="flex justify-between 
            mt-4 pl-2 pr-4
            text-stone-800 font-semibold">
                <p>Amount Due</p>
                <p>{fmtPhp(invoiceData ? invoiceData.amtDue : 0)}</p>
            </div>
            <div className="p-2 mt-8 rounded-lg border-stone-200 border">
                <p className="text-sm text-stone-600">Note: {invoiceData ? invoiceData.invoice_note : ""}</p>
            </div>
        </div>
    )
}