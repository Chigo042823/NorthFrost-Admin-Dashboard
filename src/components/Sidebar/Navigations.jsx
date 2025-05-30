import { BsCardChecklist } from "react-icons/bs"
import { FiHome } from "react-icons/fi"
import { IoPeopleSharp } from "react-icons/io5"
import { TbCurrencyPeso } from "react-icons/tb"

export const Navigations = () => {
  return (
    <div className="space-y-1">
        <Route isSelected={true} title={"Dashboard"} Icon={FiHome}/>
        <Route isSelected={false} title={"Finance"} Icon={TbCurrencyPeso}/>
        <Route isSelected={false} title={"Orders"} Icon={BsCardChecklist}/>
        <Route isSelected={false} title={"Clients"} Icon={IoPeopleSharp}/>  
    </div>
  )
}

const Route = ({isSelected, title, Icon}) => {
  return (
    <button className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5
      text-md transition-all ${isSelected ? "bg-white text-stone-900 shadow": "text-stone-500 hover:bg-gray-200"}`}>
      <Icon className={`${isSelected ? "text-indigo-700": ""}`} />
      {title}
    </button>
    )
}