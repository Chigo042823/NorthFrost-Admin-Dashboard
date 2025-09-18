import { ModalProvider } from "@/shared/contexts/modalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const qclient = new QueryClient();

export const AppProvider = ({children}) => {
    return (
        <QueryClientProvider client={qclient}>
            <ModalProvider>
                {children}
            </ModalProvider>
        </QueryClientProvider>
    )
} 