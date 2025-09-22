import { useModal } from "../contexts/modalContext";
import { Input } from "@/shared/input";

export const TableToolbar = ({globalFilter, setGlobalFilter, name, willInsert}) => {
    const modalContext = useModal();

    return (
        <div className="flex items-center py-2 justify-between">
            <Input  
                value={globalFilter}
                onChange={e => setGlobalFilter(String(e.target.value))}
                placeholder="Search..."
                className="w-[30%] min-w-[15rem]"
                />
                {willInsert && 
                    <button className="capitalize bg-indigo-500 p-2 rounded-lg text-gray-50
                        hover:transform-[scale(1.05)] hover:bg-indigo-600 hover:text-indigo-100 transition-all ease-in-out"
                        onClick={() => {
                            modalContext.setModalData(null);
                            modalContext.setCurrentModal(name + "Form");
                            modalContext.setTitle("Add " + name);
                            console.log(modalContext.currentModal)
                        }}
                        >
                        Add {name}
                    </button>
                }
        </div>
    )
}