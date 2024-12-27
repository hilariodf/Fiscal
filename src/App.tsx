import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import InvoiceForm from "./components/invoices/InvoiceForm";
import InvoiceDetail from "./components/invoices/InvoiceDetail";
import InvoiceSearch from "./components/invoices/InvoiceSearch";
import ProductList from "./components/products/ProductList";
import ClientList from "./components/clients/ClientList";
import ReportsDashboard from "./components/reports/ReportsDashboard";
import SettingsPage from "./components/settings/SettingsPage";
import Sidebar from "./components/layout/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home isCollapsed={false} />
            </Layout>
          }
        />
        <Route
          path="/invoices/new"
          element={
            <Layout>
              <InvoiceForm />
            </Layout>
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <Layout>
              <InvoiceDetail />
            </Layout>
          }
        />
        <Route
          path="/invoices"
          element={
            <Layout>
              <InvoiceSearch />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductList />
            </Layout>
          }
        />
        <Route
          path="/clients"
          element={
            <Layout>
              <ClientList />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <ReportsDashboard />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
