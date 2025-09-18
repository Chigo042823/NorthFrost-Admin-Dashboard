import { MainContainer } from "@/shared/components/mainContainer"
import { ClientsTable } from "../clients/components/clientsTable"

export const Clients = () => {
  return (
    <MainContainer title={"Clients"}>
        <ClientsTable />
    </MainContainer>
  )
}

