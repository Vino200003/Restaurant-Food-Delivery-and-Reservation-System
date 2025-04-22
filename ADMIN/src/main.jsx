import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import ViewOrders from "./pages/ViewOrders/ViewOrders";
import InventoryPage from "./pages/InventoryPage/InventoryPage";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:orderId" element={<ViewOrders />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  </BrowserRouter>
);