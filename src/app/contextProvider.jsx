import { ModalProvider } from "@/shared/contexts/modalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InvoiceDataProvider } from "@/features/invoices/contexts/invoiceDataContext";

const qclient = new QueryClient();

export const AppProvider = ({children}) => {
    return (
        <QueryClientProvider client={qclient}>
            <ModalProvider>
                <InvoiceDataProvider>
                    {children}
                </InvoiceDataProvider>
            </ModalProvider>
        </QueryClientProvider>
    )
} 