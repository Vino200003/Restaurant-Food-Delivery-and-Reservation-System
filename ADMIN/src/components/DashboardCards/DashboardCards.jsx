import React from "react";

// Black & white SVG icons for dashboard cards
const cardIcons = [
  // Total Orders
  <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/></svg>,
  // Total Revenue
  <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>,
  // Dine-In Orders
  <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="8" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>,
  // Avg Order Value
  <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16v-4M12 16v-7M16 16v-2"/></svg>
];

const cards = [
  {
    label: "Total Orders",
    value: 124,
    change: "+12%",
    changeColor: "#22c55e",
    sub: "from yesterday",
    icon: cardIcons[0]
  },
  {
    label: "Total Revenue",
    value: "$3,426",
    change: "+8.2%",
    changeColor: "#22c55e",
    sub: "from yesterday",
    icon: cardIcons[1]
  },
  {
    label: "Dine-In Orders",
    value: 67,
    change: "-5%",
    changeColor: "#ef4444",
    sub: "from yesterday",
    icon: cardIcons[2]
  },
  {
    label: "Avg Order Value",
    value: "$27.63",
    change: "+2.4%",
    changeColor: "#22c55e",
    sub: "from yesterday",
    icon: cardIcons[3]
  }
];

const DashboardCards = () => (
  <div style={{ display: "flex", gap: 24 }}>
    {cards.map(card => (
      <div key={card.label} style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 4px #0001",
        padding: "20px 24px",
        flex: 1,
        minWidth: 180,
        display: "flex",
        alignItems: "center",
        gap: 16
      }}>
        <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {card.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, color: "#888", marginBottom: 8 }}>{card.label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{card.value}</div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 14 }}>
            <span style={{ color: card.changeColor, fontWeight: 600, marginRight: 6 }}>{card.change}</span>
            <span style={{ color: "#aaa" }}>{card.sub}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default DashboardCards;
