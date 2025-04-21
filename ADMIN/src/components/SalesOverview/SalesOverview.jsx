import React from "react";

const SalesOverview = () => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 4px #0001",
    padding: 24,
    marginBottom: 24
  }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
      <div style={{ fontWeight: 600, fontSize: 17, flex: 1 }}>Sales Overview</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ background: "#fbeee6", color: "#d97706", border: "none", borderRadius: 6, padding: "4px 12px", fontWeight: 600 }}>Daily</button>
        <button style={{ background: "#f3f4f6", color: "#888", border: "none", borderRadius: 6, padding: "4px 12px" }}>Weekly</button>
        <button style={{ background: "#f3f4f6", color: "#888", border: "none", borderRadius: 6, padding: "4px 12px" }}>Monthly</button>
      </div>
    </div>
    <div style={{
      background: "#f3f4f6",
      borderRadius: 8,
      height: 160,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#bbb",
      fontSize: 16
    }}>
      Sales Data Visualization<br />
      <span style={{ fontSize: 13 }}>In a real implementation, this would be a chart showing order and revenue data over time</span>
    </div>
  </div>
);

export default SalesOverview;
