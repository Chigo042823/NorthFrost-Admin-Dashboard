import { MainContainer } from "@/shared/components/mainContainer"
import { ClientsTable } from "./components/clientsTable"

export const Clients = () => {
  return (
    <MainContainer title={"Clients"}>
        <ClientsTable />
    </MainContainer>
  )
}

