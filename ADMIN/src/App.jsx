import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";


const App = () => {
  return (
    
      
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        
        
      </Routes>
    
  );
};

export default App;