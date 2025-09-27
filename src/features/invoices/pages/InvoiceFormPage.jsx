import { MainContainer } from "@/shared/components/mainContainer"
import { InvoiceForm } from "../components/InvoiceForm"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { InvoicePreview } from "../components/InvoicePreview";
import { FaRegFilePdf } from "react-icons/fa6";
import { PiPrinter } from "react-icons/pi";
import { generatePdf, printPdf } from "@/shared/utils/pdf";
import { useInvoiceData } from "../contexts/invoiceDataContext";

export const InvoiceFormPage = () => {
    const {setInvoiceData} = useInvoiceData(); 

    return (
        <MainContainer className={"md:grid md:grid-cols-[2fr_1.7fr]"} noPad>
            <div className="p-4 flex-col items-center">
                <Link to={"../list"} className="flex items-center space-x-1 text-gray-400" 
                    onClick={() => setInvoiceData(null)}>
                    <FaArrowLeftLong /> <p className="font-semibold">Invoices</p>
                </Link>
                <div className="rounded-lg p-2">
                    <InvoiceForm />
                </div>
            </div>
            <div className="border-l border-t border-gray-300 md:border-t-0 bg-gray-300 md:h-screen overflow-y-auto">
                <div className="h-[11vh] bg-white border-b p-3 flex justify-between sticky top-0">
                    <p className="font-semibold text-stone-800 text-2xl">Preview</p>
                    <div className="flex items-center space-x-2">
                        <button type="button" className="p-2 border border-stone-300 flex items-center rounded 
                        text-xs font-semibold text-stone-700
                        hover:bg-gray-100" onClick={() => {
                                console.log("Generating PDF...");
                                generatePdf("invoicePreview");
                            }}>
                            <FaRegFilePdf size={"1rem"}/> PDF
                        </button>
                        <button type="button" className="p-2 border border-stone-300 flex items-center rounded 
                        text-xs font-semibold text-stone-700
                        hover:bg-gray-100" onClick={() => printPdf("invoicePreview")}>
                            <PiPrinter size={"1rem"} /> Print
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <InvoicePreview />
                </div>
            </div>
        </MainContainer>
    )
}
export default InvoiceFormPage;