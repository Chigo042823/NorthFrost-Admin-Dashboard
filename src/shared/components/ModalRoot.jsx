import ClientModal from "@/features/clients/components/clientModal";
import { useModal } from "../contexts/modalContext"
import OrderModal from "@/features/orders/components/orderModal";
import DeleteOrderAlert from "@/features/orders/components/deleteOrderAlert";

export const ModalRoot = () => {
    const { currentModal, modalData } = useModal();

    if (!currentModal) return null;

    switch(currentModal) {
        case "clientForm": 
            return <ClientModal formData={modalData} />;
        case "orderForm": 
            return <OrderModal formData={modalData} />;
        case "confirmDelete":
            return <DeleteOrderAlert />
        default:
            return null
    }
}