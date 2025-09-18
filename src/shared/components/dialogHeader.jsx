import { RxCrossCircled } from "react-icons/rx";
import { useModal } from "../contexts/modalContext"

export const DialogHeader = ({title, closeFn}) => {
    const modalCtx = useModal();
    return (
        <div className="text-3xl font-semibold text-stone-800 border-b-1 border-stone-400 pb-2 flex justify-between">
            {title}
            <button className="text-stone-500 text-4xl mr-2 flex items-center justify-center hover:text-stone-600" 
                onClick={closeFn}>
                <RxCrossCircled />
            </button>
        </div>
    )
}