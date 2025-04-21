import React from "react";

const cards = [
  {
    label: "Total Orders",
    value: 124,
    change: "+12%",
    changeColor: "#22c55e",
    sub: "from yesterday",
    icon: "🧾"
  },
  {
    label: "Total Revenue",
    value: "$3,426",
    change: "+8.2%",
    changeColor: "#22c55e",
    sub: "from yesterday",
    icon: "💰"
  },
  {
    label: "Dine-In Orders",
    value: 67,
    change: "-5%",
    changeColor: "#ef4444",
    sub: "from yesterday",
    icon: "🍽️"
  },
  {
    label: "Avg Order Value",
    value: "$27.63",
    change: "+2.4%",
    changeColor: "#22c55e",
    sub: "from yesterday",
    icon: "📊"
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
        minWidth: 180
      }}>
        <div style={{ fontSize: 15, color: "#888", marginBottom: 8 }}>{card.label}</div>
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{card.value}</div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 14 }}>
          <span style={{ color: card.changeColor, fontWeight: 600, marginRight: 6 }}>{card.change}</span>
          <span style={{ color: "#aaa" }}>{card.sub}</span>
        </div>
      </div>
    ))}
  </div>
);

export default DashboardCards;
