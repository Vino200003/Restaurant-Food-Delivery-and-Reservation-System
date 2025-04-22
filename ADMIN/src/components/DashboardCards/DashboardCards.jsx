import React from "react";
import "./DashboardCards.css";

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
  <div className="dashboard-cards">
    {cards.map(card => (
      <div key={card.label} className="dashboard-card">
        <div className="dashboard-card-icon">
          {card.icon}
        </div>
        <div className="dashboard-card-content">
          <div className="dashboard-card-label">{card.label}</div>
          <div className="dashboard-card-value">{card.value}</div>
          <div className="dashboard-card-change-row">
            <span className="dashboard-card-change" style={{ color: card.changeColor }}>{card.change}</span>
            <span className="dashboard-card-sub">{card.sub}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default DashboardCards;
