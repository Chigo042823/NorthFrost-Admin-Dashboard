import { MdCancel } from "react-icons/md"

export const ModalHeader = ({title, visibleHandle}) => {
    return (
        <div className="text-3xl font-semibold text-stone-900 border-b-1 border-stone-400 pb-2 flex justify-between">
            {title}
            <button className="text-red-500 flex items-center justify-center hover:text-red-600" 
                onClick={() => visibleHandle(false)}>
                <MdCancel size={36} />
            </button>
        </div>
    )
}