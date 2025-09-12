import { MdCancel } from "react-icons/md"

export const OrderModal = () => {
    return (
        <>
        <Modal />
        </>
    )
}

const Modal = () => {
    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
            <div className="rounded-xl bg-white w-[80vw] h-[88vh] opacity-100 p-4">
                <div className="text-3xl text-stone-900 border-b-1 border-stone-400 pb-2 flex justify-between">
                    Title
                    <button className="text-red-500 flex items-center justify-center hover:text-red-600">
                        <MdCancel size={36} />
                    </button>
                </div>
            </div>
        </div>
    )
}