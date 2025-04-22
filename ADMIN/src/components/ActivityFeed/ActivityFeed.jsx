import React from "react";

// Black & white SVG icons for activity feed
const feedIcons = [
  // New order
  <svg width="18" height="18" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/></svg>,
  // Reservation
  <svg width="18" height="18" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 9h18"/></svg>,
  // Alert
  <svg width="18" height="18" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>,
  // Staff
  <svg width="18" height="18" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>,
  // Success
  <svg width="18" height="18" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2l4-4"/></svg>
];

const activities = [
  { icon: feedIcons[0], text: "New order #ORD-1235 received", time: "2 min ago" },
  { icon: feedIcons[1], text: "Table #8 reserved for tonight", time: "15 min ago" },
  { icon: feedIcons[2], text: "Low stock alert: Tomatoes (2kg left)", time: "1 hour ago" },
  { icon: feedIcons[3], text: "Chef Mark logged in for shift", time: "2 hours ago" },
  { icon: feedIcons[4], text: "Order #ORD-1230 delivered successfully", time: "3 hours ago" }
];

const ActivityFeed = () => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 4px #0001",
    padding: 20,
    marginBottom: 0,
    fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif"
  }}>
    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Activity Feed</div>
    <div>
      {activities.map((a, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 14
        }}>
          <span style={{
            background: "#f3f4f6",
            color: "#222",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            marginRight: 12
          }}>{a.icon}</span>
          <div>
            <div style={{ fontSize: 14 }}>{a.text}</div>
            <div style={{ fontSize: 12, color: "#aaa" }}>{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityFeed;
