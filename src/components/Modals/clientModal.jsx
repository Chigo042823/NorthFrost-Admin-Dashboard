import { ModalHeader } from "./modalHeader"
import { ModalButtons } from "./modalButtons"
import { ClientForm } from "./clientForm"

export const ClientModal = ({data, visibleHandle}) => {
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
                <ModalHeader title={"Client Details"} visibleHandle={visibleHandle}/>
                <ClientForm data={data}/>
                <ModalButtons visibleHandle={visibleHandle} />
            </div>
        </div>
    )
}

