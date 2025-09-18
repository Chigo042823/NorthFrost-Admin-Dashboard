import { MainContainer } from "@/shared/components/mainContainer"
import { OrdersTable } from "../orders/components/ordersTable"

export const Orders = () => {
  return (
    <MainContainer title={"Orders"}>
        <div className="mx-auto rounded-lg shadow">
          <OrdersTable />
        </div>
    </MainContainer>
  )
}

