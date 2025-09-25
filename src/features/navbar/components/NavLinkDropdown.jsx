import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { VscPreview } from "react-icons/vsc";

import { useLocation } from "react-router-dom";

import React from "react";

export const NavLinkDropdown = ({title, Icon, children, href}) => {
    const location = useLocation();
    const path = location.pathname;
    const root = path.split("/")[1]

    const isActive = href == root;

    return (
        <DropdownMenu>
                <DropdownMenuTrigger className={`h-full items-center w-full rounded-t-xl md:rounded 
                px-2 md:py-1.5 *:transition-all duration-200 
                ${isActive ? "bg-white text-stone-900 shadow": "bg-stone-100 text-stone-500 hover:bg-gray-200"}`}>
                    <div className="items-center gap-2">
                        <Icon className={`${isActive ? "text-indigo-700": ""} text-3xl md:text-base`} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"min-w-0 bg-stone-200 p-0"}>
                    {React.Children.map(children, (child, index) => (
                        <div key={index} className={""}>
                            {child}
                        </div>
                    ))}
                </DropdownMenuContent>
        </DropdownMenu>
    )
}