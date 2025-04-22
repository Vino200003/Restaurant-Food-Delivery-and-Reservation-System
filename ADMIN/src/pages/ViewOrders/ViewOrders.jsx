import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./ViewOrders.css";

const orderData = {
  id: "ORD-001",
  date: "April 21, 2023 at 2:30 PM",
  status: "Delivered",
  statusColor: "#16a34a",
  statusBg: "#e7fbe6",
  orderType: "Delivery",
  paymentMethod: "Credit Card (Visa •••• 4242)",
  paymentStatus: "Paid",
  paymentStatusColor: "#16a34a",
  paymentStatusBg: "#e7fbe6",
  customer: {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Apartment 4B, Metropolis, NY 10001"
  },
  items: [
    {
      name: "Margherita Pizza",
      options: "Medium, Thin Crust",
      note: "Note: Extra sauce",
      quantity: 1,
      price: 12.99,
      total: 12.99
    },
    {
      name: "Chicken Wings",
      options: "Buffalo, Ranch dip",
      quantity: 2,
      price: 9.99,
      total: 19.98
    },
    {
      name: "Caesar Salad",
      options: "No croutons",
      quantity: 1,
      price: 6.00,
      total: 6.00
    }
  ],
  subtotal: 38.97,
  tax: 3.25,
  deliveryFee: 3.99,
  tip: 5.00,
  total: 51.21,
  timeline: [
    { label: "Order Received", time: "2:15 PM", date: "April 21, 2023", completed: true },
    { label: "Order Confirmed", time: "2:20 PM", date: "April 21, 2023", completed: true },
    { label: "Preparing", time: "2:35 PM", date: "April 21, 2023", completed: true },
    { label: "Out for Delivery", time: "3:00 PM", date: "April 21, 2023", completed: true },
    { label: "Delivered", time: "3:25 PM", date: "April 21, 2023", completed: true }
  ]
};

const ViewOrders = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  // In a real app, fetch order by orderId

  return (
    <>
      <AdminNavbar />
      <div style={{ width: "100%", marginTop: 64, background: "#f7f8fa", minHeight: "100vh" }}>
        <div className="view-orders-root">
          <AdminSidebar />
          <main className="view-orders-main">
            <div className="view-orders-header">
              <button className="view-orders-back" onClick={() => navigate(-1)}>
                &larr;
              </button>
              <div>
                <span className="view-orders-title">Order #{orderData.id}</span>
                <span className="view-orders-date">{orderData.date}</span>
              </div>
              <div className="view-orders-actions">
                <button className="view-orders-print">Print</button>
                <button className="view-orders-send">Send Receipt</button>
              </div>
            </div>
            <div className="view-orders-info-row">
              <div className="view-orders-info-card">
                <div className="view-orders-info-title">Order Information</div>
                <div className="view-orders-info-list">
                  <div>
                    <span>Status</span>
                    <span className="view-orders-status" style={{
                      background: orderData.statusBg,
                      color: orderData.statusColor,
                      border: `1px solid ${orderData.statusColor}`
                    }}>{orderData.status.toLowerCase()}</span>
                  </div>
                  <div>
                    <span>Order Type</span>
                    <span>{orderData.orderType}</span>
                  </div>
                  <div>
                    <span>Payment Method</span>
                    <span>{orderData.paymentMethod}</span>
                  </div>
                  <div>
                    <span>Payment Status</span>
                    <span className="view-orders-status" style={{
                      background: orderData.paymentStatusBg,
                      color: orderData.paymentStatusColor,
                      border: `1px solid ${orderData.paymentStatusColor}`
                    }}>{orderData.paymentStatus}</span>
                  </div>
                </div>
              </div>
              <div className="view-orders-info-card">
                <div className="view-orders-info-title">Customer Information</div>
                <div className="view-orders-customer">
                  <div className="view-orders-customer-name">{orderData.customer.name}</div>
                  <div className="view-orders-customer-email">{orderData.customer.email}</div>
                  <div className="view-orders-customer-phone">{orderData.customer.phone}</div>
                  <div className="view-orders-customer-address-label">Delivery Address</div>
                  <div className="view-orders-customer-address-row">
                    <span className="view-orders-customer-address">{orderData.customer.address}</span>
                    <button className="view-orders-map-btn">View Map</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="view-orders-section">
              <div className="view-orders-section-title">Order Items</div>
              <table className="view-orders-items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Options</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="view-orders-item-name">{item.name}</div>
                        {item.note && <div className="view-orders-item-note">{item.note}</div>}
                      </td>
                      <td>{item.options}</td>
                      <td>{item.quantity}</td>
                      <td>{`$${item.price.toFixed(2)}`}</td>
                      <td>{`$${item.total.toFixed(2)}`}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}>Subtotal</td>
                    <td>{`$${orderData.subtotal.toFixed(2)}`}</td>
                  </tr>
                  <tr>
                    <td colSpan={4}>Tax</td>
                    <td>{`$${orderData.tax.toFixed(2)}`}</td>
                  </tr>
                  <tr>
                    <td colSpan={4}>Delivery Fee</td>
                    <td>{`$${orderData.deliveryFee.toFixed(2)}`}</td>
                  </tr>
                  <tr>
                    <td colSpan={4}>Tip</td>
                    <td>{`$${orderData.tip.toFixed(2)}`}</td>
                  </tr>
                  <tr className="view-orders-total-row">
                    <td colSpan={4}>Total</td>
                    <td>{`$${orderData.total.toFixed(2)}`}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="view-orders-section">
              <div className="view-orders-section-title">Order Timeline</div>
              <div className="view-orders-timeline">
                {orderData.timeline.map((step, idx) => (
                  <div className="view-orders-timeline-row" key={idx}>
                    <div className={`view-orders-timeline-dot ${step.completed ? "completed" : ""}`}></div>
                    <div className="view-orders-timeline-content">
                      <div className="view-orders-timeline-label">{step.label}</div>
                      <div className="view-orders-timeline-date">{step.date}</div>
                    </div>
                    <div className="view-orders-timeline-time">{step.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ViewOrders;
