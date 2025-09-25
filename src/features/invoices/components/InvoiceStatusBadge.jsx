import { Badge } from "@/components/ui/badge";

export const InvoiceStatusBadge = ({status}) => {
    let bg = "";
    switch (status) {
        case "pending":
            bg =  "bg-stone-400";
            break;
        case "paid":
            bg =  "bg-green-500";
            break;
        case "partially paid":
            bg =  "bg-yellow-500";
            break;            
    }
    return (
        <Badge className={bg + " capitalize"}>{status}</Badge>
    )
}