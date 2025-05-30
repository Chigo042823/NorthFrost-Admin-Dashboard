import { Sidebar } from "../components/Sidebar/Sidebar"
import { Dashboard } from "../components/Dashboard/Dashboard"

export const Home = () => {
  return (
    <main className="grid gap-4 grid-cols-[230px_1fr]">
        <Sidebar />
        <Dashboard />
    </main>
  )
}
