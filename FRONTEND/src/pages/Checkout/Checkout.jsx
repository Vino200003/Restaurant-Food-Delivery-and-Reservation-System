import React, { useState, useContext } from "react";
import "./Checkout.css";
import { CartContext } from "../../context/CartContext"; // Import CartContext
import Footer from "../../components/Footer/Footer"; // Import Footer

const Checkout = () => {
  const { calculateSubtotal } = useContext(CartContext); // Access subtotal calculation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Card Payment");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", formData, paymentMethod);
    alert("Order placed successfully!");
  };

  const subtotal = calculateSubtotal(); // Get the subtotal value

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="delivery-info">
          <h2>
            <span>Delivery</span> Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </form>
        </div>
        <div className="cart-summary">
          <h2>
            <span>Cart</span> Total
          </h2>
          <p>SubTotal: Rs.{subtotal.toFixed(2)}</p>
          <p>Shipping Fee: Rs.0.00</p>
          <p>Total: Rs.{subtotal.toFixed(2)}</p>
          <h3>
            <span>Payment</span> Method
          </h3>
          <div className="payment-methods">
            <button
              className={paymentMethod === "Card Payment" ? "active" : ""}
              onClick={() => setPaymentMethod("Card Payment")}
            >
              Card Payment
            </button>
            <button
              className={paymentMethod === "Cash on Delivery" ? "active" : ""}
              onClick={() => setPaymentMethod("Cash on Delivery")}
            >
              Cash on Delivery
            </button>
          </div>
          <button className="place-order-btn" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
      <Footer /> {/* Footer remains at the bottom */}
    </div>
  );
};

export default Checkout;
