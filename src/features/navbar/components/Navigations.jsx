import { BsCardChecklist } from "react-icons/bs"
import { FiHome } from "react-icons/fi"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { TbCurrencyPeso } from "react-icons/tb"
import { BsBoxSeam } from "react-icons/bs"
import { RiShieldUserLine } from "react-icons/ri"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { VscPreview } from "react-icons/vsc";
import { FaList } from "react-icons/fa";

import { NavBarLink } from "./NavBarLink"
import { NavLinkAccordion } from "./NavLinkAccordion"
import { NavLinkDropdown } from "./NavLinkDropdown"
import { NavBarDropdownItem } from "./NavBarDropdownItem"

export const Navigations = () => {

  return (
    <div className="md:space-y-1 flex gap-x-2 flex-row space-y-0 md:flex-col justify-center md:justify-start h-full">
        <NavBarLink title={"Dashboard"} Icon={FiHome} href={"/"}/>
        <NavBarLink title={"Orders"} Icon={BsCardChecklist} href={"/orders"}/>
        <NavBarLink title={"Finances"} Icon={TbCurrencyPeso} href={"/finances"}/>

        <div className="hidden md:inline">
          <NavLinkAccordion title={"Invoices"} Icon={LiaFileInvoiceDollarSolid} href={"invoices"}>
            <NavBarLink isSub={true} title={"List"} Icon={FaList} href={"/invoices/list"}/>
            <NavBarLink isSub={true} title={"Form"} Icon={VscPreview} href={"/invoices/form"}/>
          </NavLinkAccordion> 
        </div>
        <div className="md:hidden">
          <NavLinkDropdown title={"Invoices"} Icon={LiaFileInvoiceDollarSolid} href={"invoices"}>
            <NavBarDropdownItem isSub={true} title={"List"} Icon={FaList} href={"/invoices/list"}/>
            <NavBarDropdownItem isSub={true} title={"Form"} Icon={VscPreview} href={"/invoices/form"}/>
          </NavLinkDropdown> 
        </div>
          

        <NavBarLink title={"Inventory"} Icon={BsBoxSeam} href={"/inventory"}/>  
        <NavBarLink title={"Clients"} Icon={MdOutlinePeopleAlt} href={"/clients"}/>  
        <NavBarLink title={"Users"} Icon={RiShieldUserLine} href={"/users"}/>  
    </div>
  )
}