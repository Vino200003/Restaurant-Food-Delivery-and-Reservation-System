import React from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import SalesOverview from "../../components/SalesOverview/SalesOverview";
import ReservationsPanel from "../../components/ReservationsPanel/ReservationsPanel";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";

// Card and section styles
const sectionCardStyle = {
  borderRadius: 14,
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
  padding: "20px 20px 16px 20px",
  background: "#fff",
  marginBottom: 0
};

const sectionHeaderStyle = {
  fontWeight: 700,
  fontSize: 20,
  marginBottom: 12,
  letterSpacing: 0.2
};

const cardColors = [
  { background: "#fffbe6", header: "#b7791f" },         // Key Metrics
  { background: "#e6f7fa", header: "#0891b2" },         // Sales Overview
  { background: "#f3e8ff", header: "#7c3aed" },         // Recent Orders
  { background: "#e7fbe6", header: "#16a34a" },         // Reservations
  { background: "#fbeee6", header: "#d97706" }          // Activity Feed
];

const AdminHomePage = () => {
  return (
    <>
      <AdminNavbar />
      <div
        style={{
          width: "100%",
          marginTop: 64,
          background: "linear-gradient(135deg, #f7f8fa 60%, #fbeee6 100%)",
          minHeight: "100vh"
        }}
      >
        <div
          style={{
            display: "flex",
            minHeight: "calc(100vh - 64px)",
            background: "transparent"
          }}
        >
          <AdminSidebar />
          <main
            className="roboto-custom"
            style={{
              flex: 1,
              padding: "32px 24px 24px 24px",
              background: "#fff",
              borderRadius: 18,
              margin: "32px 32px 32px 0",
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
              minHeight: "calc(100vh - 128px)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Page Title */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 24,
              gap: 16
            }}>
              <span
                style={{
                  fontSize: 32,
                  color: "#d97706",
                  fontWeight: 700,
                  letterSpacing: 1
                }}
              >
                Dashboard
              </span>
              <span
                style={{
                  background: "#fbeee6",
                  color: "#d97706",
                  fontSize: 13,
                  padding: "4px 14px",
                  borderRadius: 12,
                  fontWeight: 500
                }}
              >
                Admin Panel
              </span>
            </div>
            <div style={{ color: "#888", marginBottom: 24, fontSize: 15 }}>
              Overview of your restaurant performance
            </div>
            {/* Key Metrics */}
            <div style={{
              ...sectionCardStyle,
              marginBottom: 24,
              background: cardColors[0].background
            }}>
              <div style={{ ...sectionHeaderStyle, color: cardColors[0].header }}>Key Metrics</div>
              <DashboardCards />
            </div>
            {/* Main Panels */}
            <div style={{
              display: "flex",
              gap: 24,
              marginTop: 0,
              flex: 1
            }}>
              {/* Left column: Sales Overview & Recent Orders */}
              <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ ...sectionCardStyle, background: cardColors[1].background }}>
                  <div style={{ ...sectionHeaderStyle, color: cardColors[1].header }}>Sales Overview</div>
                  <SalesOverview />
                </div>
                <div style={{ ...sectionCardStyle, background: cardColors[2].background }}>
                  <div style={{ ...sectionHeaderStyle, color: cardColors[2].header }}>Recent Orders</div>
                  <RecentOrders />
                </div>
              </div>
              {/* Right column: Reservations & Activity Feed */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ ...sectionCardStyle, background: cardColors[3].background }}>
                  <div style={{ ...sectionHeaderStyle, color: cardColors[3].header }}>Reservations</div>
                  <ReservationsPanel />
                </div>
                <div style={{ ...sectionCardStyle, background: cardColors[4].background }}>
                  <div style={{ ...sectionHeaderStyle, color: cardColors[4].header }}>Activity Feed</div>
                  <ActivityFeed />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
