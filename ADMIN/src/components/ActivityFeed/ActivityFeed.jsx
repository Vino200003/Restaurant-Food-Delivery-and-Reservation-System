import React from "react";

const activities = [
  { icon: "🆕", text: "New order #ORD-1235 received", time: "2 min ago", color: "#3b82f6" },
  { icon: "📅", text: "Table #8 reserved for tonight", time: "15 min ago", color: "#a855f7" },
  { icon: "⚠️", text: "Low stock alert: Tomatoes (2kg left)", time: "1 hour ago", color: "#ef4444" },
  { icon: "👨‍🍳", text: "Chef Mark logged in for shift", time: "2 hours ago", color: "#f59e42" },
  { icon: "✅", text: "Order #ORD-1230 delivered successfully", time: "3 hours ago", color: "#22c55e" }
];

const ActivityFeed = () => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 4px #0001",
    padding: 20,
    marginBottom: 0
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
            background: a.color,
            color: "#fff",
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
