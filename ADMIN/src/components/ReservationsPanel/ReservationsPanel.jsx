import React from "react";

const reservations = [
  { name: "John Smith", time: "12:30 PM", guests: 4, status: "Confirmed" },
  { name: "Maria Garcia", time: "1:00 PM", guests: 2, status: "Confirmed" },
  { name: "Robert Chen", time: "7:15 PM", guests: 6, status: "Pending" }
];

// Black/white badge style
const badgeStyle = {
  border: "1px solid #222",
  color: "#222",
  background: "#fff",
  borderRadius: 6,
  padding: "2px 10px",
  fontSize: 13,
  fontWeight: 600,
  display: "inline-block"
};

const ReservationsPanel = () => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 4px #0001",
    padding: 20,
    marginBottom: 0
  }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
      <div style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>Today's Reservations</div>
      <a href="#" style={{ color: "#d97706", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>View all &rarr;</a>
    </div>
    <div style={{ color: "#888", fontSize: 14, marginBottom: 10 }}>
      Today, June 15, 2025
    </div>
    <div>
      {reservations.map(r => (
        <div key={r.name} style={{
          display: "flex",
          alignItems: "center",
          background: "#f3f4f6",
          borderRadius: 8,
          padding: "10px 12px",
          marginBottom: 8
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{r.name}</div>
            <div style={{ fontSize: 13, color: "#888" }}>{r.time} &nbsp;·&nbsp; {r.guests} guests</div>
          </div>
          <span style={badgeStyle}>{r.status}</span>
        </div>
      ))}
    </div>
    <button style={{
      width: "100%",
      marginTop: 8,
      background: "#fbeee6",
      color: "#d97706",
      border: "none",
      borderRadius: 8,
      padding: "8px 0",
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer"
    }}>Add Reservation</button>
  </div>
);

export default ReservationsPanel;
