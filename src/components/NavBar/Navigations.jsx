import { useState } from "react"
import { BsCardChecklist } from "react-icons/bs"
import { FiHome } from "react-icons/fi"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { TbCurrencyPeso } from "react-icons/tb"
import { BsBoxSeam } from "react-icons/bs"

import { SideBarLink } from "./NavBarLink"

export const Navigations = () => {

  let [selected, setSelected] = useState(1);

  return (
    <div className="md:space-y-1 flex gap-x-2 flex-row sm:space-y-0 md:flex-col justify-center md:justify-start">
        <SideBarLink index={1} selected={selected} setSelected={setSelected} title={"Dashboard"} Icon={FiHome} href={"/"}/>
        <SideBarLink index={2} selected={selected} setSelected={setSelected} title={"Finances"} Icon={TbCurrencyPeso} href={"/finances"}/>
        <SideBarLink index={3} selected={selected} setSelected={setSelected} title={"Orders"} Icon={BsCardChecklist} href={"/orders"}/>
        <SideBarLink index={4} selected={selected} setSelected={setSelected} title={"Inventory"} Icon={BsBoxSeam} href={"/inventory"}/>  
        <SideBarLink index={5} selected={selected} setSelected={setSelected} title={"Clients"} Icon={MdOutlinePeopleAlt} href={"/clients"}/>  
    </div>
  )
}