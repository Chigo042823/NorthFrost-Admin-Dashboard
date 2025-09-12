import { ModalHeader } from "./modalHeader"
import { OrderForm } from "./orderForm"
import { ModalButtons } from "./modalButtons"
export const OrderModal = ({data, visibleHandle}) => {
    return (
        <>
        <Modal data={data} visibleHandle={visibleHandle} />
        </>
    )
}

const Modal = ({data, visibleHandle}) => {
    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
            <div className="rounded-xl bg-white w-[80vw] h-[88vh] opacity-100 p-4">
                <ModalHeader title={"Order Details"} visibleHandle={visibleHandle}/>
                <OrderForm data={data}/>
                <ModalButtons visibleHandle={visibleHandle}/>
            </div>
        </div>
    )
}