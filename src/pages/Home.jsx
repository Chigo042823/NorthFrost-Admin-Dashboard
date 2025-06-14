import { NavBar, MobileNavBar } from "../components/NavBar/NavBar"

import { Dashboard } from "../components/MainContent/Dashboard"
import { Finances } from "../components/MainContent/Finances"
import { Orders } from "../components/MainContent/Orders"
import { Inventory } from "../components/MainContent/Inventory"
import { Clients } from "../components/MainContent/Clients"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export const Home = () => {
  return (
    <main className="grid gap-4 grid-cols-1 md:grid-cols-[230px_1fr] h-full md:pb-0 pb-[4.5rem]">
        <Router>
          <NavBar />
          <MobileNavBar />

          <Routes>
            <Route index element={<Dashboard />} />
            <Route path = "/finances" element={<Finances />} />
            <Route path = "/orders" element={<Orders />} />
            <Route path = "/Inventory" element={<Inventory />} />
            <Route path = "/clients" element={<Clients />} />
          </Routes>

        </Router>
    </main>
  )
}
