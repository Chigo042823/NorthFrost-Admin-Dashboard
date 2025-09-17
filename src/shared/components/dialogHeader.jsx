import { MdCancel } from "react-icons/md"
import { useModal } from "../contexts/modalContext"

export const DialogHeader = ({title, closeFn}) => {
    const modalCtx = useModal();
    return (
        <div className="text-3xl font-semibold text-stone-800 border-b-1 border-stone-400 pb-2 flex justify-between">
            {title}
            <button className="text-red-500 flex items-center justify-center hover:text-red-600" 
                onClick={closeFn}>
                <MdCancel size={36} />
            </button>
        </div>
    )
}