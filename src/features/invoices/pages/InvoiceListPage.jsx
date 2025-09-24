import { MainContainer } from "@/shared/components/mainContainer"
import { InvoicesTable } from "../components/InvoicesTable"

export const InvoiceListPage = () => {
    return (
        <MainContainer title={"List"}>
            <InvoicesTable />
        </MainContainer>
    )
}
export default InvoiceListPage;