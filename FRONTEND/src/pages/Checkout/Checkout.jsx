import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FaShoppingBag, FaTruck, FaUtensils, FaCreditCard, FaWallet, FaRegCreditCard, FaCheckCircle } from "react-icons/fa";
import "./Checkout.css";

const Checkout = () => {
  const { cart, calculateSubtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [orderType, setOrderType] = useState("Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = calculateSubtotal();
  const deliveryFee = orderType === "Delivery" ? 3.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone || (orderType === "Delivery" && !userDetails.address)) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Validate card details if paying with card
    if ((paymentMethod === "Credit" || paymentMethod === "Debit") && 
        (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv)) {
      alert("Please fill in all card details.");
      return;
    }

    // Simulate order processing
    setIsProcessing(true);
    
    setTimeout(() => {
      // Generate a random order ID
      const newOrderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      
      // Show order complete message
      setIsProcessing(false);
      setOrderComplete(true);
      
      // Clear cart after successful order
      clearCart();
      
      // Wait 3 seconds before redirecting to the menu page
      setTimeout(() => {
        navigate('/menu');
      }, 3000);
    }, 1500);
  };

  // If cart is empty and we're not processing or displaying a completed order, redirect to menu
  if (cart.length === 0 && !isProcessing && !orderComplete) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Please add some items to your cart before proceeding to checkout.</p>
            <button onClick={() => navigate('/menu')} className="browse-menu-btn">
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Complete Your Order</h1>
          <p>Review your order and provide delivery details</p>
        </div>
        
        {orderComplete ? (
          <div className="order-complete-message">
            <FaCheckCircle className="success-icon" />
            <h2>Your Order Has Been Placed!</h2>
            <p>Thank you for your order. Your order ID is: <strong>{orderId}</strong></p>
          </div>
        ) : isProcessing ? (
          <div className="processing-order">
            <div className="spinner"></div>
            <h2>Processing your order...</h2>
            <p>Please wait while we confirm your payment and process your order.</p>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="checkout-left">
              <div className="order-type-section">
                <h2>Select Order Type</h2>
                <div className="order-type-options">
                  <div 
                    className={`order-option ${orderType === "Delivery" ? "active" : ""}`}
                    onClick={() => setOrderType("Delivery")}
                  >
                    <FaTruck className="option-icon" />
                    <span>Delivery</span>
                  </div>
                  <div 
                    className={`order-option ${orderType === "Pickup" ? "active" : ""}`}
                    onClick={() => setOrderType("Pickup")}
                  >
                    <FaShoppingBag className="option-icon" />
                    <span>Pickup</span>
                  </div>
                  <div 
                    className={`order-option ${orderType === "Dine-In" ? "active" : ""}`}
                    onClick={() => setOrderType("Dine-In")}
                  >
                    <FaUtensils className="option-icon" />
                    <span>Dine-In</span>
                  </div>
                </div>
              </div>

              <div className="user-details-section">
                <h2>Contact Information</h2>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  {orderType === "Delivery" && (
                    <div className="form-group">
                      <label>Delivery Address</label>
                      <textarea
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete delivery address"
                        required
                      />
                    </div>
                  )}
                </form>
              </div>
              
              <div className="payment-section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  <div 
                    className={`payment-option ${paymentMethod === "Cash" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("Cash")}
                  >
                    <FaWallet className="option-icon" />
                    <span>Cash On Delivery</span>
                  </div>
                  <div 
                    className={`payment-option ${paymentMethod === "Credit" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("Credit")}
                  >
                    <FaCreditCard className="option-icon" />
                    <span>Credit Card</span>
                  </div>
                  <div 
                    className={`payment-option ${paymentMethod === "Debit" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("Debit")}
                  >
                    <FaRegCreditCard className="option-icon" />
                    <span>Debit Card</span>
                  </div>
                </div>

                {/* Card Details Form */}
                {(paymentMethod === "Credit" || paymentMethod === "Debit") && (
                  <div className="card-details-form">
                    <h3>Card Details</h3>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardDetailsChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardDetailsChange}
                        placeholder="Name on card"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleCardDetailsChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardDetailsChange}
                          placeholder="123"
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="checkout-right">
              <div className="order-summary-section">
                <h2>Order Summary</h2>
                <div className="order-items">
                  {cart.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-info">
                        <div className="item-quantity">{item.quantity}x</div>
                        <div className="item-name">{item.name}</div>
                      </div>
                      <div className="item-price">Rs. {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="order-totals">
                  <div className="total-line">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-line">
                    <span>Delivery Fee</span>
                    <span>Rs. {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="total-line">
                    <span>Tax (8%)</span>
                    <span>Rs. {tax.toFixed(2)}</span>
                  </div>
                  <div className="total-line grand-total">
                    <span>Total</span>
                    <span>Rs. {total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                  Complete Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
