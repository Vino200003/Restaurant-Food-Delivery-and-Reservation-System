import React from "react";

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
  <div style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 4px #0001",
    padding: 0,
    marginBottom: 0,
    overflow: "auto"
  }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
      <thead>
        <tr style={{ color: "#888", fontWeight: 600, background: "#f3f4f6" }}>
          <th style={{ padding: "12px 8px", textAlign: "left" }}>Order ID</th>
          <th style={{ padding: "12px 8px", textAlign: "left" }}>Customer</th>
          <th style={{ padding: "12px 8px", textAlign: "left" }}>Date</th>
          <th style={{ padding: "12px 8px", textAlign: "left" }}>Type</th>
          <th style={{ padding: "12px 8px", textAlign: "left" }}>Items</th>
          <th style={{ padding: "12px 8px", textAlign: "left" }}>Amount</th>
          <th style={{ padding: "12px 8px", textAlign: "left" }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
            <td style={{ color: "#d97706", fontWeight: 600, padding: "12px 8px" }}>{order.id}</td>
            <td style={{ padding: "12px 8px" }}>
              <div style={{ fontWeight: 600 }}>{order.customer.name}</div>
              <div style={{ color: "#888", fontSize: 13 }}>{order.customer.phone}</div>
            </td>
            <td style={{ padding: "12px 8px" }}>{order.date}</td>
            <td style={{ padding: "12px 8px" }}>{order.type}</td>
            <td style={{ padding: "12px 8px" }}>{order.items}</td>
            <td style={{ padding: "12px 8px" }}>{order.amount}</td>
            <td style={{ padding: "12px 8px" }}>
              <span style={{
                background: statusStyles[order.status]?.bg,
                color: statusStyles[order.status]?.color,
                border: `1px solid ${statusStyles[order.status]?.color}`,
                borderRadius: 16,
                padding: "2px 14px",
                fontSize: 14,
                fontWeight: 500,
                textTransform: "lowercase"
              }}>
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
