import { StatsCard } from "./StatsCard"
import { Widgets } from "./Widgets"
import { MainContainer } from "../MainContainer"

export const Dashboard = () => {
  return (
    <MainContainer title={"Dashboard"}>
        <StatsCard />
        <Widgets />
    </MainContainer>
  )
}
