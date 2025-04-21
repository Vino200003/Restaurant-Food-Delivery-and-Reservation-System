import React from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import SalesOverview from "../../components/SalesOverview/SalesOverview";
import ReservationsPanel from "../../components/ReservationsPanel/ReservationsPanel";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";

const AdminHomePage = () => {
  return (
    <>
      <AdminNavbar />
      <div style={{ width: "100%", marginTop: 64 /* adjust if your navbar height differs */ }}>
        <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "#f7f8fa" }}>
          <AdminSidebar />
          <main
            className="roboto-custom"
            style={{
              flex: 1,
              padding: "32px 24px 24px 24px"
            }}
          >
            <h2 style={{ marginBottom: 4 }}>Dashboard</h2>
            <div style={{ color: "#888", marginBottom: 24, fontSize: 15 }}>
              Overview of your restaurant performance
            </div>
            <DashboardCards />
            <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
              <div style={{ flex: 2 }}>
                <SalesOverview />
                <RecentOrders />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                <ReservationsPanel />
                <ActivityFeed />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
