import { BsCardChecklist } from "react-icons/bs"
import { FiHome } from "react-icons/fi"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { TbCurrencyPeso } from "react-icons/tb"
import { BsBoxSeam } from "react-icons/bs"
import { RiShieldUserLine } from "react-icons/ri"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

import { SideBarLink } from "./NavBarLink"
import { NavLinkAccordion } from "./NavLinkAccordion"

export const Navigations = () => {

  return (
    <div className="md:space-y-1 flex gap-x-2 flex-row space-y-0 md:flex-col justify-center md:justify-start h-full">
        <SideBarLink title={"Dashboard"} Icon={FiHome} href={"/"}/>
        <SideBarLink title={"Orders"} Icon={BsCardChecklist} href={"/orders"}/>
        <SideBarLink title={"Finances"} Icon={TbCurrencyPeso} href={"/finances"}/>

        <NavLinkAccordion title={"Invoices"} Icon={LiaFileInvoiceDollarSolid} href={"invoices"}>
          <SideBarLink isSub={true} title={"List"} Icon={LiaFileInvoiceDollarSolid} href={"/invoices/list"}/>
          <SideBarLink isSub={true} title={"Form"} Icon={LiaFileInvoiceDollarSolid} href={"/invoices/form"}/>
          <SideBarLink isSub={true} title={"Details"} Icon={LiaFileInvoiceDollarSolid} href={"/invoices/details"}/>
        </NavLinkAccordion>   

        <SideBarLink title={"Inventory"} Icon={BsBoxSeam} href={"/inventory"}/>  
        <SideBarLink title={"Clients"} Icon={MdOutlinePeopleAlt} href={"/clients"}/>  
        <SideBarLink title={"Users"} Icon={RiShieldUserLine} href={"/users"}/>  
    </div>
  )
}