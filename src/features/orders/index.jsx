import { MainContainer } from "@/shared/components/mainContainer"
import { OrdersTable } from "../orders/components/ordersTable"

export const Orders = () => {
  return (
    <MainContainer title={"Orders"}>
        <OrdersTable />
    </MainContainer>
  )
}

