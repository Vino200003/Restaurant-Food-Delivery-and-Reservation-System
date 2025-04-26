import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

// Example staff data
const initialStaff = [
  { id: 1, name: "Mark Lee", role: "Chef", email: "mark.lee@vanniinn.com", phone: "+94 71 111 2222", status: "Active" },
  { id: 2, name: "Sara Kim", role: "Waiter", email: "sara.kim@vanniinn.com", phone: "+94 72 333 4444", status: "Active" },
  { id: 3, name: "John Doe", role: "Manager", email: "john.doe@vanniinn.com", phone: "+94 73 555 6666", status: "Inactive" },
  { id: 4, name: "Priya Singh", role: "Receptionist", email: "priya.singh@vanniinn.com", phone: "+94 74 777 8888", status: "Active" }
];

const statusColors = {
  Active: { color: "#16a34a", bg: "#e7fbe6" },
  Inactive: { color: "#dc2626", bg: "#fee2e2" }
};

const roles = ["All Roles", "Manager", "Chef", "Waiter", "Receptionist"];
const statusOptions = ["All Statuses", "Active", "Inactive"];

const emptyStaff = { name: "", role: "Waiter", email: "", phone: "", status: "Active" };

const StaffPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [staff, setStaff] = useState(initialStaff);
  const [showAdd, setShowAdd] = useState(false);
  const [newStaff, setNewStaff] = useState(emptyStaff);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const filteredStaff = staff.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search)) &&
    (roleFilter === "All Roles" || s.role === roleFilter) &&
    (statusFilter === "All Statuses" || s.status === statusFilter)
  );

  const handleAddChange = e => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSave = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.email || !newStaff.phone) return;
    setStaff(prev => [
      ...prev,
      { ...newStaff, id: prev.length ? Math.max(...prev.map(s => s.id)) + 1 : 1 }
    ]);
    setShowAdd(false);
    setNewStaff(emptyStaff);
  };

  const handleAddCancel = () => {
    setShowAdd(false);
    setNewStaff(emptyStaff);
  };

  const handleEditClick = (s) => {
    setEditId(s.id);
    setEditData({ ...s });
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = id => {
    setStaff(prev => prev.map(s => s.id === id ? { ...editData } : s));
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
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Staff</div>
            <div style={{ color: "#6b7280", marginBottom: 24, fontSize: 16 }}>
              Manage your restaurant staff members
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24
            }}>
              <input
                type="text"
                placeholder="Search staff..."
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
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff"
                }}
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
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
                <span style={{ fontSize: 18, marginRight: 6 }}>+</span> Add Staff
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
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Role</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Email</th>
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
                          value={newStaff.name}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Name"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <select
                          name="role"
                          value={newStaff.role}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                        >
                          {roles.filter(r => r !== "All Roles").map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="email"
                          value={newStaff.email}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Email"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="phone"
                          value={newStaff.phone}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Phone"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <select
                          name="status"
                          value={newStaff.status}
                          onChange={handleAddChange}
                          style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
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
                  {filteredStaff.map(s => (
                    <tr key={s.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      {editId === s.id ? (
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
                            <select
                              name="role"
                              value={editData.role}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            >
                              {roles.filter(r => r !== "All Roles").map(r => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="email"
                              value={editData.email}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
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
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
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
                              onClick={() => handleEditSave(s.id)}
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
                          <td style={{ fontWeight: 600, padding: "12px 8px" }}>{s.name}</td>
                          <td style={{ padding: "12px 8px" }}>{s.role}</td>
                          <td style={{ padding: "12px 8px" }}>{s.email}</td>
                          <td style={{ padding: "12px 8px" }}>{s.phone}</td>
                          <td style={{ padding: "12px 8px" }}>
                            <span style={{
                              background: statusColors[s.status]?.bg,
                              color: statusColors[s.status]?.color,
                              border: `1px solid ${statusColors[s.status]?.color}`,
                              borderRadius: 16,
                              padding: "2px 14px",
                              fontSize: 14,
                              fontWeight: 500
                            }}>
                              {s.status}
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
                            }} onClick={() => handleEditClick(s)}>Edit</button>
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
                  {filteredStaff.length === 0 && !showAdd && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", color: "#888", padding: 24 }}>
                        No staff members found.
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

export default StaffPage;
