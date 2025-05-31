import { useState } from "react"
import { BsCardChecklist } from "react-icons/bs"
import { FiHome } from "react-icons/fi"
import { IoPeopleSharp } from "react-icons/io5"
import { TbCurrencyPeso } from "react-icons/tb"

import { Link } from "react-router-dom"

export const Navigations = () => {

  let [selected, setSelected] = useState(1);

  return (
    <div className="space-y-1">
        <SideBarLink index={1} selected={selected} setSelected={setSelected} title={"Dashboard"} Icon={FiHome} href={"/"}/>
        <SideBarLink index={2} selected={selected} setSelected={setSelected} title={"Finances"} Icon={TbCurrencyPeso}href={"/finances"}/>
        <SideBarLink index={3} selected={selected} setSelected={setSelected} title={"Orders"} Icon={BsCardChecklist}href={"/orders"}/>
        <SideBarLink index={4} selected={selected} setSelected={setSelected} title={"Clients"} Icon={IoPeopleSharp}href={"/clients"}/>  
    </div>
  )
}

const SideBarLink  = ({index, selected, setSelected, title, Icon, href}) => {
  let isSelected;
  if(selected == index) {
    isSelected = true;
  } else {
    isSelected = false;
  }

  const clickHandler = () => {
    setSelected(index);
  }

  return (
    <Link onClick={clickHandler} className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5
      text-md transition-all duration-200 ${isSelected ? "bg-white text-stone-900 shadow": "bg-stone-100 text-stone-500 hover:bg-gray-200"}`}
      to={href}>
      <Icon className={`${isSelected ? "text-indigo-700": ""}`} />
      {title}
    </Link>
    )
}