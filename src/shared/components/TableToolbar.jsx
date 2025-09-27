import { useModal } from "../contexts/modalContext";
import { Input } from "@/shared/input";
import { useState } from "react";
import { MonthSelect } from "./monthSelect";
import { monthOptions } from "../utils/month";

export const TableToolbar = ({globalFilter, setGlobalFilter, setColumnFilter, name, willInsert, onClick = defaultOnCLick}) => {
    const modalContext = useModal();

    const currMonth = new Date().getMonth();

    const [monthSelected, setMonthSelected] = useState(monthOptions[currMonth + 1]);

    function onChange(e) {
        setMonthSelected(e);
        if (e.value === 0) {
            setColumnFilter([]); 
        } else {
            setColumnFilter([
            {
                id: "delivery_datetime",
                value: { month: e.value, year: 2025 },
            },
            ]);
        }
    }

    return (
        <div className="flex items-center py-2 w-full space-x-2">
            <div className="md:flex md:space-x-2    ">
                <Input  
                value={globalFilter}
                onChange={e => setGlobalFilter(String(e.target.value))}
                placeholder="Search..."
                className="w-[30%] min-w-[9rem]"
                />
                {name == "order" &&
                    <MonthSelect
                        monthSelected={monthSelected}
                        onChange={onChange}
                    />
                }
            </div>
                {willInsert && 
                    <button className="capitalize bg-indigo-500 p-2 rounded-lg text-gray-50
                        hover:transform-[scale(1.05)] hover:bg-indigo-600 hover:text-indigo-100 transition-all ease-in-out
                        ml-auto"
                        onClick={() =>
                            onClick(name, modalContext)
                        }
                        >
                        Add {name}
                    </button>
                }
        </div>
    )
}

function defaultOnCLick(name, modalContext) {

    modalContext.setModalData(null);
    modalContext.setCurrentModal(name + "Form");
    modalContext.setTitle("Add " + name);
}