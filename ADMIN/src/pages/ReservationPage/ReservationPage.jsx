import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

// Example reservation data
const initialReservations = [
  { id: 1, name: "John Smith", date: "2024-06-15", time: "12:30", guests: 4, status: "Confirmed", phone: "+94 71 123 4567" },
  { id: 2, name: "Maria Garcia", date: "2024-06-15", time: "13:00", guests: 2, status: "Confirmed", phone: "+94 77 987 6543" },
  { id: 3, name: "Robert Chen", date: "2024-06-15", time: "19:15", guests: 6, status: "Pending", phone: "+94 76 222 3333" },
  { id: 4, name: "Emily Johnson", date: "2024-06-16", time: "18:00", guests: 3, status: "Cancelled", phone: "+94 72 444 5555" }
];

const statusColors = {
  Confirmed: { color: "#16a34a", bg: "#e7fbe6" },
  Pending: { color: "#d97706", bg: "#fbeee6" },
  Cancelled: { color: "#dc2626", bg: "#fee2e2" }
};

const statusOptions = ["All Statuses", "Confirmed", "Pending", "Cancelled"];
const dateOptions = ["All Dates", "Today", "Upcoming"];

const emptyReservation = { name: "", date: "", time: "", guests: 1, status: "Pending", phone: "" };

const ReservationPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [reservations, setReservations] = useState(initialReservations);
  const [showAdd, setShowAdd] = useState(false);
  const [newReservation, setNewReservation] = useState(emptyReservation);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // Helper to get today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().slice(0, 10);

  const filteredReservations = reservations.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search);
    const matchesStatus =
      statusFilter === "All Statuses" || r.status === statusFilter;
    let matchesDate = true;
    if (dateFilter === "Today") {
      matchesDate = r.date === todayStr;
    } else if (dateFilter === "Upcoming") {
      matchesDate = r.date > todayStr;
    }
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleAddChange = e => {
    const { name, value } = e.target;
    setNewReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSave = () => {
    if (!newReservation.name || !newReservation.date || !newReservation.time || !newReservation.guests || !newReservation.phone) return;
    setReservations(prev => [
      ...prev,
      { ...newReservation, id: prev.length ? Math.max(...prev.map(r => r.id)) + 1 : 1 }
    ]);
    setShowAdd(false);
    setNewReservation(emptyReservation);
  };

  const handleAddCancel = () => {
    setShowAdd(false);
    setNewReservation(emptyReservation);
  };

  const handleEditClick = (r) => {
    setEditId(r.id);
    setEditData({ ...r });
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = id => {
    setReservations(prev => prev.map(r => r.id === id ? { ...editData } : r));
    setEditId(null);
    setEditData({});
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditData({});
  };

  return (
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
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Reservations</div>
            <div style={{ color: "#6b7280", marginBottom: 24, fontSize: 16 }}>
              Manage and track all table reservations
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24
            }}>
              <input
                type="text"
                placeholder="Search reservations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: "10px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  width: 240,
                  outline: "none"
                }}
              />
              <span style={{ fontSize: 15, color: "#888" }}>Filter:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff"
                }}
              >
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff"
                }}
              >
                {dateOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <button
                style={{
                  marginLeft: "auto",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: 500,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                onClick={() => setShowAdd(true)}
              >
                <span style={{ fontSize: 18, marginRight: 6 }}>+</span> Add Reservation
              </button>
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
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Name</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Date</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Time</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Guests</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Phone</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Status</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {showAdd && (
                    <tr>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="name"
                          value={newReservation.name}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Name"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="date"
                          type="date"
                          value={newReservation.date}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="time"
                          type="time"
                          value={newReservation.time}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="guests"
                          type="number"
                          min={1}
                          value={newReservation.guests}
                          onChange={handleAddChange}
                          style={{ width: 60, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="phone"
                          value={newReservation.phone}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Phone"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <select
                          name="status"
                          value={newReservation.status}
                          onChange={handleAddChange}
                          style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <button
                          style={{
                            background: "#e7fbe6",
                            color: "#16a34a",
                            border: "none",
                            borderRadius: 8,
                            padding: "6px 14px",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                            marginRight: 8
                          }}
                          onClick={handleAddSave}
                        >Save</button>
                        <button
                          style={{
                            background: "#fee2e2",
                            color: "#dc2626",
                            border: "none",
                            borderRadius: 8,
                            padding: "6px 14px",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer"
                          }}
                          onClick={handleAddCancel}
                        >Cancel</button>
                      </td>
                    </tr>
                  )}
                  {filteredReservations.map(r => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      {editId === r.id ? (
                        <>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="name"
                              value={editData.name}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="date"
                              type="date"
                              value={editData.date}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="time"
                              type="time"
                              value={editData.time}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="guests"
                              type="number"
                              min={1}
                              value={editData.guests}
                              onChange={handleEditChange}
                              style={{ width: 60, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="phone"
                              value={editData.phone}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <select
                              name="status"
                              value={editData.status}
                              onChange={handleEditChange}
                              style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending">Pending</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <button
                              style={{
                                background: "#e7fbe6",
                                color: "#16a34a",
                                border: "none",
                                borderRadius: 8,
                                padding: "6px 14px",
                                fontWeight: 500,
                                fontSize: 14,
                                cursor: "pointer",
                                marginRight: 8
                              }}
                              onClick={() => handleEditSave(r.id)}
                            >Save</button>
                            <button
                              style={{
                                background: "#fee2e2",
                                color: "#dc2626",
                                border: "none",
                                borderRadius: 8,
                                padding: "6px 14px",
                                fontWeight: 500,
                                fontSize: 14,
                                cursor: "pointer"
                              }}
                              onClick={handleEditCancel}
                            >Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ fontWeight: 600, padding: "12px 8px" }}>{r.name}</td>
                          <td style={{ padding: "12px 8px" }}>{r.date}</td>
                          <td style={{ padding: "12px 8px" }}>{r.time}</td>
                          <td style={{ padding: "12px 8px" }}>{r.guests}</td>
                          <td style={{ padding: "12px 8px" }}>{r.phone}</td>
                          <td style={{ padding: "12px 8px" }}>
                            <span style={{
                              background: statusColors[r.status]?.bg,
                              color: statusColors[r.status]?.color,
                              border: `1px solid ${statusColors[r.status]?.color}`,
                              borderRadius: 16,
                              padding: "2px 14px",
                              fontSize: 14,
                              fontWeight: 500
                            }}>
                              {r.status}
                            </span>
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
                              cursor: "pointer",
                              marginRight: 8
                            }} onClick={() => handleEditClick(r)}>Edit</button>
                            <button style={{
                              background: "#fee2e2",
                              color: "#dc2626",
                              border: "none",
                              borderRadius: 8,
                              padding: "6px 14px",
                              fontWeight: 500,
                              fontSize: 14,
                              cursor: "pointer"
                            }}>Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {filteredReservations.length === 0 && !showAdd && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", color: "#888", padding: 24 }}>
                        No reservations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
