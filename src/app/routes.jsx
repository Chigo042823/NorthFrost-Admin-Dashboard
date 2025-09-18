import { Layout } from "./layout"
import { LoginPage } from "@/features/auth/LoginPage"

import { Dashboard } from "@/features/dashboard"
import { Finances } from "../features/Finances"
import { Orders } from "../features/orders"
import { Inventory } from "../features/Inventory"
import { Clients } from "../features/clients"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Router >
      <Routes>

        {/* Public */}
        <Route path="/login" element={ <LoginPage /> } />
 
        {/* Private */}
        <Route element={<Layout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path = "/finances" element={<Finances />} />
          <Route path = "/orders" element={<Orders />} />
          <Route path = "/Inventory" element={<Inventory />} />
          <Route path = "/clients" element={<Clients />} />
        </Route>
      </Routes>
    </Router>
  )
}
