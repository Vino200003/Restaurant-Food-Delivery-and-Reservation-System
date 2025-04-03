import React from "react";
import Header from "../../components/Header/Header";
import AboutUs from "../../components/AboutUs/AboutUs";
import OrderTypeSelection from "../../components/OrderTypeSelection/OrderTypeSelection";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <OrderTypeSelection/>
      <AboutUs />
      <Footer/>
    </div>
  );
};

export default Home;