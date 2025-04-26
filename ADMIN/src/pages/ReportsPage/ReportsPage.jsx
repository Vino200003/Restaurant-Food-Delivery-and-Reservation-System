import React from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const reportCards = [
  {
    label: "Total Sales",
    value: "LKR 1,240,000",
    icon: (
      <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
    ),
    color: "#0891b2",
    bg: "#e6f7fa"
  },
  {
    label: "Orders",
    value: "2,340",
    icon: (
      <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/></svg>
    ),
    color: "#d97706",
    bg: "#fbeee6"
  },
  {
    label: "Reservations",
    value: "1,120",
    icon: (
      <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 9h18"/></svg>
    ),
    color: "#16a34a",
    bg: "#e7fbe6"
  },
  {
    label: "Top Item",
    value: "Margherita Pizza",
    icon: (
      <svg width="28" height="28" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
    color: "#7c3aed",
    bg: "#f3e8ff"
  }
];

const recentReports = [
  { id: 1, type: "Sales", date: "2024-06-14", summary: "Daily sales report generated", status: "Completed" },
  { id: 2, type: "Inventory", date: "2024-06-13", summary: "Inventory usage summary", status: "Completed" },
  { id: 3, type: "Orders", date: "2024-06-13", summary: "Order trends report", status: "Completed" },
  { id: 4, type: "Reservations", date: "2024-06-12", summary: "Reservation analytics", status: "Completed" }
];

const ReportsPage = () => (
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
          flexDirection: "column",
          fontFamily: "Arial, sans-serif"
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Reports</div>
          <div style={{ color: "#6b7280", marginBottom: 24, fontSize: 16 }}>
            Analytics and downloadable reports for your restaurant
          </div>
          <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
            {reportCards.map(card => (
              <div key={card.label} style={{
                flex: 1,
                background: card.bg,
                borderRadius: 12,
                padding: "20px 18px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 1px 4px #0001"
              }}>
                <div style={{
                  background: "#fff",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                  border: `2px solid ${card.color}`
                }}>
                  {card.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, color: "#888" }}>{card.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 22, color: card.color }}>{card.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            background: "#f3f4f6",
            borderRadius: 12,
            padding: 32,
            marginBottom: 32,
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#bbb",
            fontSize: 18,
            flexDirection: "column"
          }}>
            <div>Charts & Analytics Visualization</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>In a real implementation, this would be a chart (e.g., sales trends, order breakdown, etc.)</div>
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
                  <th style={{ padding: "12px 8px", textAlign: "left" }}>Report Type</th>
                  <th style={{ padding: "12px 8px", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "12px 8px", textAlign: "left" }}>Summary</th>
                  <th style={{ padding: "12px 8px", textAlign: "left" }}>Status</th>
                  <th style={{ padding: "12px 8px", textAlign: "left" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 8px" }}>{r.type}</td>
                    <td style={{ padding: "12px 8px" }}>{r.date}</td>
                    <td style={{ padding: "12px 8px" }}>{r.summary}</td>
                    <td style={{ padding: "12px 8px" }}>
                      <span style={{
                        background: "#e7fbe6",
                        color: "#16a34a",
                        border: "1px solid #16a34a",
                        borderRadius: 16,
                        padding: "2px 14px",
                        fontSize: 14,
                        fontWeight: 500
                      }}>{r.status}</span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <button style={{
                        background: "#fbeee6",
                        color: "#d97706",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 14px",
                        fontWeight: 500,
                        fontSize: 14,
                        cursor: "pointer"
                      }}>Download</button>
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

export default ReportsPage;
