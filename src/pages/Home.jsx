import { Sidebar } from "../components/Sidebar/Sidebar"
import { Dashboard } from "../components/Dashboard"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { Finances } from "../components/Finances";
import { Orders } from "../components/Orders";
import { Clients } from "../components/Clients";

export const Home = () => {
  return (
    <main className="grid gap-4 grid-cols-[230px_1fr]">
        <Router>
          <Sidebar />

          <Routes>
            <Route index element={<Dashboard />} />
            <Route path = "/finances" element={<Finances />} />
            <Route path = "/orders" element={<Orders />} />
            <Route path = "/clients" element={<Clients />} />
          </Routes>

        </Router>
    </main>
  )
}
