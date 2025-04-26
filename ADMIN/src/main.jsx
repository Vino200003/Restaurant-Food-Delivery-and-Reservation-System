import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import ViewOrders from "./pages/ViewOrders/ViewOrders";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import StaffPage from "./pages/StaffPage/StaffPage";
import ReservationPage from "./pages/ReservationPage/ReservationPage";
import ReportsPage from "./pages/ReportsPage/ReportsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import MenuPage from "./pages/MenuPage/MenuPage";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:orderId" element={<ViewOrders />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/reservations" element={<ReservationPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  </BrowserRouter>
);