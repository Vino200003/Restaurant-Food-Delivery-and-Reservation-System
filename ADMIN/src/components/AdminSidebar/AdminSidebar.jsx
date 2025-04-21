import React from "react";

const navItems = [
  { label: "Dashboard", icon: "🏠", active: true },
  { label: "Orders", icon: "🧾" },
  { label: "Reservations", icon: "📅" },
  { label: "Inventory", icon: "📦" },
  { label: "Staff", icon: "👨‍🍳" },
  { label: "Reports", icon: "📊" },
  { label: "Settings", icon: "⚙️" },
];

const AdminSidebar = () => (
  <aside style={{
    width: 220,
    background: "#fff",
    borderRight: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    padding: "18px 0 0 0"
  }}>
    <nav style={{ flex: 1 }}>
      {navItems.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 24px",
            background: item.active ? "#fbeee6" : "transparent",
            color: item.active ? "#d97706" : "#222",
            fontWeight: item.active ? 600 : 400,
            cursor: "pointer"
          }}
        >
          <span style={{ marginRight: 12 }}>{item.icon}</span>
          {item.label}
        </div>
      ))}
    </nav>
    <div style={{
      margin: "auto 0 24px 0",
      padding: "16px 24px",
      borderTop: "1px solid #eee",
      display: "flex",
      alignItems: "center"
    }}>
      <div style={{
        background: "#fbeee6",
        color: "#d97706",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 18,
        marginRight: 12
      }}>A</div>
      <div>
        <div style={{ fontWeight: 600 }}>Admin User</div>
        <div style={{ fontSize: 13, color: "#888" }}>admin@example.com</div>
      </div>
    </div>
  </aside>
);

export default AdminSidebar;
