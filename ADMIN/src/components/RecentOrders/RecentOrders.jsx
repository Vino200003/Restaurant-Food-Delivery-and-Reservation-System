import React from "react";

const orders = [
  { id: "ORD-1234", customer: "Sarah Johnson", type: "Delivery", status: "Completed", items: 3, total: "$42.99", time: "10 min ago" },
  { id: "ORD-1233", customer: "Michael Brown", type: "Pickup", status: "In Progress", items: 2, total: "$26.50", time: "25 min ago" },
  { id: "ORD-1232", customer: "Emily Davis", type: "Dine-In", status: "Completed", items: 4, total: "$58.75", time: "45 min ago" },
  { id: "ORD-1231", customer: "James Wilson", type: "Delivery", status: "In Progress", items: 1, total: "$19.99", time: "1 hr ago" },
  { id: "ORD-1230", customer: "Lisa Thompson", type: "Pickup", status: "Ready", items: 2, total: "$24.50", time: "2 hr ago" }
];

const typeColor = {
  "Delivery": "#3b82f6",
  "Pickup": "#a855f7",
  "Dine-In": "#f59e42"
};

const statusColor = {
  "Completed": "#22c55e",
  "In Progress": "#3b82f6",
  "Ready": "#f59e42"
};

const RecentOrders = () => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 4px #0001",
    padding: 20,
    marginBottom: 0
  }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
      <div style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>Recent Orders</div>
      <a href="#" style={{ color: "#d97706", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>View all &rarr;</a>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ color: "#888", fontWeight: 600, background: "#f3f4f6" }}>
            <th style={{ padding: "8px 8px", textAlign: "left" }}>ORDER ID</th>
            <th style={{ padding: "8px 8px", textAlign: "left" }}>CUSTOMER</th>
            <th style={{ padding: "8px 8px", textAlign: "left" }}>TYPE</th>
            <th style={{ padding: "8px 8px", textAlign: "left" }}>STATUS</th>
            <th style={{ padding: "8px 8px", textAlign: "left" }}>ITEMS</th>
            <th style={{ padding: "8px 8px", textAlign: "left" }}>TOTAL</th>
            <th style={{ padding: "8px 8px", textAlign: "left" }}>TIME</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ color: "#d97706", fontWeight: 600, padding: "8px 8px" }}>{o.id}</td>
              <td style={{ padding: "8px 8px" }}>{o.customer}</td>
              <td style={{ padding: "8px 8px" }}>
                <span style={{
                  background: typeColor[o.type],
                  color: "#fff",
                  borderRadius: 6,
                  padding: "2px 10px",
                  fontSize: 13,
                  fontWeight: 600
                }}>{o.type}</span>
              </td>
              <td style={{ padding: "8px 8px" }}>
                <span style={{
                  background: statusColor[o.status],
                  color: "#fff",
                  borderRadius: 6,
                  padding: "2px 10px",
                  fontSize: 13,
                  fontWeight: 600
                }}>{o.status}</span>
              </td>
              <td style={{ padding: "8px 8px" }}>{o.items}</td>
              <td style={{ padding: "8px 8px" }}>{o.total}</td>
              <td style={{ padding: "8px 8px" }}>{o.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentOrders;
