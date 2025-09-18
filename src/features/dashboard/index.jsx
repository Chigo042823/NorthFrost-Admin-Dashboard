import { StatsCard, StatsCardSection } from "./components/StatsCard"
import { Widgets } from "./components/Widgets"
import { MainContainer } from "@/shared/components/mainContainer"

import { GiReceiveMoney, GiPayMoney } from "react-icons/gi"
import { FaClockRotateLeft } from "react-icons/fa6"
import { useOrders } from "../orders/api/orderQueries"

export const Dashboard = () => {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return <p>Loading...</p>
  }
  const pending = orders.filter(order => order.status == "pending").length;
  return (
    <MainContainer title={"Dashboard"}>
        <StatsCardSection>
          <StatsCard title={"Total Earnings"} color={"green"} value={1250} lastValue={568} Icon={GiReceiveMoney} isCurrency={true} href={"Finances"}/>
          <StatsCard title={"Total Spendings"} color={"red"} value={760} lastValue={800} Icon={GiPayMoney} isCurrency={true} href={"Finances"} />
          <StatsCard title={"Pending Orders"} color={"orange"} value={pending} lastValue={15} Icon={FaClockRotateLeft} href={"Orders"}/>
        </StatsCardSection>
        <Widgets data={orders} />
    </MainContainer>
  )
}
