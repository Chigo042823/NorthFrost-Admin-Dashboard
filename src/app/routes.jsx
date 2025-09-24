import { Layout } from "./layout"
import { LoginPage } from "@/features/auth/LoginPage"
import { RequireAuth } from "@/features/auth/components/RequireAuth"

import { Dashboard } from "@/features/dashboard"
import { Finances } from "../features/Finances"
import { Orders } from "../features/orders"
import { Inventory } from "../features/Inventory"
import { Clients } from "../features/clients"
import { Users } from "@/features/users"
import { InvoiceDetailsPage, InvoiceFormPage, InvoiceListPage } from "@/features/invoices"

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
        <Route element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
          }>
          <Route index path="/" element={<Dashboard />} />
          <Route path = "/finances" element={<Finances />} />
          <Route path = "/orders" element={<Orders />} />
          <Route path = "/inventory" element={<Inventory />} />
          <Route path = "/clients" element={<Clients />} />
          <Route path = "/users" element={<Users />} />
          <Route path="/invoices">
            <Route path = "list" element={<InvoiceListPage />} />
            <Route path = "form" element={<InvoiceFormPage />} />
            <Route path = "details" element={<InvoiceDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
