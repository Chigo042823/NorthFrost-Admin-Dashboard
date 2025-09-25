import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLocation } from "react-router-dom"

export const NavLinkAccordion = ({title, Icon, children, href}) => {
    const location = useLocation();
    const path = location.pathname;
    const root = path.split("/")[1]

    const isActive = href == root;

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="link-1">
                <AccordionTrigger className={`h-full items-center w-full rounded-t-xl md:rounded 
                text-base px-2 md:py-1.5 *:transition-all duration-200 
                ${isActive ? "bg-white text-stone-900 shadow": "bg-stone-100 text-stone-500 hover:bg-gray-200"}`}>
                    <div className="flex items-center gap-2">
                        <Icon className={`${isActive ? "text-indigo-700": ""} text-3xl md:text-base`} />
                        <span className='hidden md:block'>
                            {title}
                        </span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className={"pb-0 rounded-b overflow-hidden"}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}