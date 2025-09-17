import { MainContainer } from "@/shared/components/mainContainer"
import { ClientsTable } from "./components/clientsTable"

export const Clients = () => {
  return (
    <MainContainer title={"Clients"}>
      <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
        <ClientsTable />
      </div>
    </MainContainer>
  )
}

