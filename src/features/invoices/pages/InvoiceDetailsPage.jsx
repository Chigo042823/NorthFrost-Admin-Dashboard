import { MainContainer } from "@/shared/components/mainContainer"
import { InvoicesTable } from "../components/InvoicesTable"

export const InvoiceDetailsPage = () => {
    return (
        <MainContainer title={"Invoice Details"}>
            <InvoicesTable />
        </MainContainer>
    )
}
export default InvoiceDetailsPage;