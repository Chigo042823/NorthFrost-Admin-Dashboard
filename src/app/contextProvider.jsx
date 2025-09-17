import { ModalProvider } from "@/shared/contexts/modalContext";
import { AlertProvider } from "@/shared/contexts/alertContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const qclient = new QueryClient();

export const AppProvider = ({children}) => {
    return (
        <QueryClientProvider client={qclient}>
            <ModalProvider>
            <AlertProvider>
                {children}
            </AlertProvider>
            </ModalProvider>
        </QueryClientProvider>
    )
} 