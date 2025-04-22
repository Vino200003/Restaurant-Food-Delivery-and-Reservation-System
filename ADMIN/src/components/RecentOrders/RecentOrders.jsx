import React from "react";
import "./RecentOrders.css";

// Use the same orders as OrdersPage (top 5)
const orders = [
  {
    id: "ORD-001",
    customer: { name: "John Smith", phone: "+94 71 123 4567" },
    date: "2023-04-21 14:30:00",
    type: "Delivery",
    items: 4,
    amount: "LKR 14,200.00",
    status: "delivered"
  },
  {
    id: "ORD-002",
    customer: { name: "Jane Cooper", phone: "+94 77 987 6543" },
    date: "2023-04-21 13:15:00",
    type: "Pickup",
    items: 2,
    amount: "LKR 10,100.00",
    status: "preparing"
  },
  {
    id: "ORD-003",
    customer: { name: "Michael Davis", phone: "+94 76 222 3333" },
    date: "2023-04-21 12:45:00",
    type: "Dine-in",
    items: 5,
    amount: "LKR 24,800.00",
    status: "completed"
  },
  {
    id: "ORD-004",
    customer: { name: "Emily Johnson", phone: "+94 72 444 5555" },
    date: "2023-04-21 11:30:00",
    type: "Delivery",
    items: 2,
    amount: "LKR 7,900.00",
    status: "delivered"
  },
  {
    id: "ORD-005",
    customer: { name: "Robert Wilson", phone: "+94 75 666 7777" },
    date: "2023-04-21 10:20:00",
    type: "Pickup",
    items: 3,
    amount: "LKR 18,000.00",
    status: "cancelled"
  }
];

const statusStyles = {
  delivered: { color: "#16a34a", bg: "#e7fbe6" },
  preparing: { color: "#2563eb", bg: "#e6f7fa" },
  completed: { color: "#16a34a", bg: "#e7fbe6" },
  cancelled: { color: "#dc2626", bg: "#fee2e2" }
};

const RecentOrders = () => (
  <div className="recent-orders-container">
    <table className="recent-orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Type</th>
          <th>Items</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td className="order-id">{order.id}</td>
            <td>
              <div className="customer-name">{order.customer.name}</div>
              <div className="customer-phone">{order.customer.phone}</div>
            </td>
            <td>{order.date}</td>
            <td>{order.type}</td>
            <td>{order.items}</td>
            <td>{order.amount}</td>
            <td>
              <span
                className={`order-status order-status-${order.status}`}
                style={{
                  background: statusStyles[order.status]?.bg,
                  color: statusStyles[order.status]?.color,
                  border: `1px solid ${statusStyles[order.status]?.color}`
                }}
              >
                {order.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecentOrders;
