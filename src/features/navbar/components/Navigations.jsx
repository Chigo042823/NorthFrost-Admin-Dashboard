import { BsCardChecklist } from "react-icons/bs"
import { FiHome } from "react-icons/fi"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { TbCurrencyPeso } from "react-icons/tb"
import { BsBoxSeam } from "react-icons/bs"
import { RiShieldUserLine } from "react-icons/ri"
import { SideBarLink } from "./NavBarLink"

export const Navigations = () => {

  return (
    <div className="md:space-y-1 flex gap-x-2 flex-row sm:space-y-0 md:flex-col justify-center md:justify-start">
        <SideBarLink title={"Dashboard"} Icon={FiHome} href={"/"}/>
        <SideBarLink title={"Finances"} Icon={TbCurrencyPeso} href={"/finances"}/>
        <SideBarLink title={"Orders"} Icon={BsCardChecklist} href={"/orders"}/>
        <SideBarLink title={"Inventory"} Icon={BsBoxSeam} href={"/inventory"}/>  
        <SideBarLink title={"Clients"} Icon={MdOutlinePeopleAlt} href={"/clients"}/>  
        <SideBarLink title={"Users"} Icon={RiShieldUserLine} href={"/users"}/>  
    </div>
  )
}