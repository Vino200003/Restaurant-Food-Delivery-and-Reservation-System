import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

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

const OrdersPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const navigate = useNavigate();

  // Filtering logic (simple)
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.phone.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" || order.status === statusFilter;
    const matchesType =
      typeFilter === "All Types" || order.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <>
      <AdminNavbar />
      <div style={{
        width: "100%",
        marginTop: 64,
        background: "#f7f8fa",
        minHeight: "100vh"
      }}>
        <div style={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          background: "transparent"
        }}>
          <AdminSidebar />
          <main style={{
            flex: 1,
            padding: "32px 24px 24px 24px",
            background: "#fff",
            borderRadius: 18,
            margin: "32px 32px 32px 0",
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
            minHeight: "calc(100vh - 128px)",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Orders</div>
            <div style={{ color: "#6b7280", marginBottom: 24, fontSize: 16 }}>
              Manage and process all customer orders
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24
            }}>
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: "10px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  width: 240,
                  outline: "none"
                }}
              />
              <span style={{ fontSize: 15, color: "#888" }}>Filter:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff"
                }}
              >
                <option>All Statuses</option>
                <option value="delivered">delivered</option>
                <option value="preparing">preparing</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff"
                }}
              >
                <option>All Types</option>
                <option value="Delivery">Delivery</option>
                <option value="Pickup">Pickup</option>
                <option value="Dine-in">Dine-in</option>
              </select>
              <button
                style={{
                  marginLeft: "auto",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: 500,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <span style={{ fontSize: 18, marginRight: 6 }}>⭳</span> Export
              </button>
            </div>
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
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        background: idx % 2 === 0 ? "#fafafa" : "#fff",
                        transition: "background 0.2s",
                        cursor: "pointer"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fbeee6"}
                      onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "#fafafa" : "#fff"}
                    >
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
                      <td style={{ padding: "12px 8px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                            color: "#222",
                            fontWeight: 500
                          }}
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          {/* Black and white eye icon */}
                          <span style={{ fontSize: 18, marginRight: 4, display: "flex", alignItems: "center" }}>
                            <svg width="18" height="18" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="12" cy="12" r="2.5"/></svg>
                          </span>
                          View
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
