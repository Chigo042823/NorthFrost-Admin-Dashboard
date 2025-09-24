import { MainContainer } from "@/shared/components/mainContainer"
import { InvoiceForm } from "../components/InvoiceForm"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const InvoiceFormPage = () => {
    return (
        <MainContainer>
            <Link to={"../list"} className="flex items-center space-x-1 text-stone-300">
                <FaArrowLeftLong /> <p className="font-semibold">Invoices</p>
            </Link>
            <div className="w-[53%] rounded-lg p-2">
                <InvoiceForm data={[]}/>
            </div>
        </MainContainer>
    )
}
export default InvoiceFormPage;