import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHomePage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
};

export default App;