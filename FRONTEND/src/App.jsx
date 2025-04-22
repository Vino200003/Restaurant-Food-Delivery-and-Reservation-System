import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./pages/Signup/Signup";
import Menu from './pages/Menu/Menu';
import Contact from "./pages/Contact/Contact";
import Reservation from "./pages/Reservation/Reservation";
import Cart from './pages/Cart/Cart';
import Checkout from "./pages/Checkout/Checkout";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <CartProvider>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/reservation' element={<Reservation/>}/>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/menu" element={<Menu/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout />} />
        
      </Routes>
    </CartProvider>
  );
};

export default App;