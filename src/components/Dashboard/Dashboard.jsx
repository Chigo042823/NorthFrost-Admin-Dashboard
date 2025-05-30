import { StatsCard } from "./StatsCard"
import { Widgets } from "./Widgets"

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-2 space-y-1">
        <div className="p-2 pb-3 text-2xl font-bold border-b border-stone-400">
          Dashboard
        </div>
        <StatsCard />
        <Widgets />
    </div>
  )
}
