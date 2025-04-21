import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Simple black & white SVG icons
const icons = {
  Dashboard: (
    <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="7" height="10" rx="2"/><rect x="14" y="3" width="7" height="18" rx="2"/></svg>
  ),
  Orders: (
    <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/></svg>
  ),
  Reservations: (
    <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 9h18"/></svg>
  ),
  Inventory: (
    <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
  ),
  Staff: (
    <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>
  ),
  Reports: (
    <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17v-6M15 17v-2"/></svg>
  ),
  Settings: (
    <svg width="20" height="20" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
};

const navItems = [
  { label: "Dashboard", icon: icons.Dashboard, path: "/" },
  { label: "Orders", icon: icons.Orders, path: "/orders" },
  { label: "Reservations", icon: icons.Reservations },
  { label: "Inventory", icon: icons.Inventory },
  { label: "Staff", icon: icons.Staff },
  { label: "Reports", icon: icons.Reports },
  { label: "Settings", icon: icons.Settings },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
              background: item.path && location.pathname === item.path ? "#fbeee6" : "transparent",
              color: "#222",
              fontWeight: item.path && location.pathname === item.path ? 600 : 400,
              cursor: item.path ? "pointer" : "default"
            }}
            onClick={() => item.path && navigate(item.path)}
          >
            <span style={{ marginRight: 12, display: "flex", alignItems: "center" }}>{item.icon}</span>
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
          color: "#222",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 18,
          marginRight: 12
        }}>
          {/* Simple user icon */}
          <svg width="22" height="22" fill="none" stroke="black" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Admin User</div>
          <div style={{ fontSize: 13, color: "#888" }}>admin@example.com</div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
