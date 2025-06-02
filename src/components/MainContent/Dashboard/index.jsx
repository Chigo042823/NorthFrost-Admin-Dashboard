import { StatsCard, StatsCardSection } from "../../ui/StatsCard"
import { Widgets } from "./Widgets"
import { MainContainer } from "../MainContainer"

import { GiReceiveMoney, GiPayMoney } from "react-icons/gi"
import { FaClockRotateLeft } from "react-icons/fa6"

export const Dashboard = () => {
  return (
    <MainContainer title={"Dashboard"}>
        <StatsCardSection>
          <StatsCard title={"Total Earnings"} color={"green"} value={1250} lastValue={568} Icon={GiReceiveMoney} isCurrency={true} href={"Finance"}/>
          <StatsCard title={"Total Spendings"} color={"red"} value={760} lastValue={800} Icon={GiPayMoney} isCurrency={true} href={"Finance"} />
          <StatsCard title={"Pending Orders"} color={"orange"} value={10} lastValue={15} Icon={FaClockRotateLeft} href={"Orders"}/>
        </StatsCardSection>
        <Widgets />
    </MainContainer>
  )
}
