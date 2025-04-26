import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

// Example inventory data with supplier and lastUpdate
const initialInventoryItems = [
  { id: 1, name: "Tomatoes", category: "Vegetables", quantity: 12, unit: "kg", status: "Low", supplier: "Fresh Farms", lastUpdate: "2024-06-10 09:15" },
  { id: 2, name: "Mozzarella Cheese", category: "Dairy", quantity: 8, unit: "kg", status: "Sufficient", supplier: "DairyBest", lastUpdate: "2024-06-11 14:22" },
  { id: 3, name: "Chicken Breast", category: "Meat", quantity: 3, unit: "kg", status: "Low", supplier: "MeatPro", lastUpdate: "2024-06-09 17:40" },
  { id: 4, name: "Olive Oil", category: "Condiments", quantity: 15, unit: "L", status: "Sufficient", supplier: "OliveCo", lastUpdate: "2024-06-12 08:05" },
  { id: 5, name: "Basil", category: "Herbs", quantity: 0.5, unit: "kg", status: "Critical", supplier: "HerbWorld", lastUpdate: "2024-06-08 12:30" },
  { id: 6, name: "Spaghetti", category: "Pasta", quantity: 20, unit: "kg", status: "Sufficient", supplier: "PastaKing", lastUpdate: "2024-06-11 10:00" }
];

const statusColors = {
  Sufficient: { color: "#16a34a", bg: "#e7fbe6" },
  Low: { color: "#d97706", bg: "#fbeee6" },
  Critical: { color: "#dc2626", bg: "#fee2e2" }
};

const emptyNewItem = {
  name: "",
  category: "",
  quantity: "",
  unit: "",
  supplier: "",
  status: "Sufficient",
};

const InventoryPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [items, setItems] = useState(initialInventoryItems);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState(emptyNewItem);

  const categories = ["All Categories", ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEditClick = (item) => {
    setEditId(item.id);
    setEditData({ ...item });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...editData,
              quantity: isNaN(Number(editData.quantity)) ? item.quantity : Number(editData.quantity),
              lastUpdate: new Date().toISOString().slice(0, 16).replace("T", " ")
            }
          : item
      )
    );
    setEditId(null);
    setEditData({});
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSave = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity || !newItem.unit || !newItem.supplier) return;
    setItems(prev => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(i => i.id)) + 1 : 1,
        ...newItem,
        quantity: Number(newItem.quantity),
        lastUpdate: new Date().toISOString().slice(0, 16).replace("T", " ")
      }
    ]);
    setShowAdd(false);
    setNewItem(emptyNewItem);
  };

  const handleAddCancel = () => {
    setShowAdd(false);
    setNewItem(emptyNewItem);
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
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Inventory</div>
            <div style={{ color: "#6b7280", marginBottom: 24, fontSize: 16 }}>
              Manage and monitor your restaurant's inventory
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24
            }}>
              <input
                type="text"
                placeholder="Search inventory..."
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
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff"
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
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
                <span style={{ fontSize: 18, marginRight: 6 }}>+</span> Add Item
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
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Item Name</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Category</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Quantity</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Supplier</th>
                    <th style={{ padding: "12px 8px", textAlign: "left" }}>Last Update</th>
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
                          value={newItem.name}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Name"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="category"
                          value={newItem.category}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Category"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="quantity"
                          type="number"
                          value={newItem.quantity}
                          onChange={handleAddChange}
                          style={{ width: 70, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Qty"
                        />{" "}
                        <input
                          name="unit"
                          value={newItem.unit}
                          onChange={handleAddChange}
                          style={{ width: 40, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Unit"
                        />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <input
                          name="supplier"
                          value={newItem.supplier}
                          onChange={handleAddChange}
                          style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                          placeholder="Supplier"
                        />
                      </td>
                      <td style={{ padding: "12px 8px", color: "#888" }}>
                        {new Date().toISOString().slice(0, 16).replace("T", " ")}
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <select
                          name="status"
                          value={newItem.status}
                          onChange={handleAddChange}
                          style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                        >
                          <option value="Sufficient">Sufficient</option>
                          <option value="Low">Low</option>
                          <option value="Critical">Critical</option>
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
                  {filteredItems.map(item => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      {editId === item.id ? (
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
                              name="category"
                              value={editData.category}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="quantity"
                              type="number"
                              value={editData.quantity}
                              onChange={handleEditChange}
                              style={{ width: 70, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />{" "}
                            <input
                              name="unit"
                              value={editData.unit}
                              onChange={handleEditChange}
                              style={{ width: 40, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <input
                              name="supplier"
                              value={editData.supplier}
                              onChange={handleEditChange}
                              style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            />
                          </td>
                          <td style={{ padding: "12px 8px", color: "#888" }}>
                            {item.lastUpdate}
                          </td>
                          <td style={{ padding: "12px 8px" }}>
                            <select
                              name="status"
                              value={editData.status}
                              onChange={handleEditChange}
                              style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                            >
                              <option value="Sufficient">Sufficient</option>
                              <option value="Low">Low</option>
                              <option value="Critical">Critical</option>
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
                              onClick={() => handleEditSave(item.id)}
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
                          <td style={{ fontWeight: 600, padding: "12px 8px" }}>{item.name}</td>
                          <td style={{ padding: "12px 8px" }}>{item.category}</td>
                          <td style={{ padding: "12px 8px" }}>{item.quantity} {item.unit}</td>
                          <td style={{ padding: "12px 8px" }}>{item.supplier}</td>
                          <td style={{ padding: "12px 8px" }}>{item.lastUpdate}</td>
                          <td style={{ padding: "12px 8px" }}>
                            <span style={{
                              background: statusColors[item.status]?.bg,
                              color: statusColors[item.status]?.color,
                              border: `1px solid ${statusColors[item.status]?.color}`,
                              borderRadius: 16,
                              padding: "2px 14px",
                              fontSize: 14,
                              fontWeight: 500
                            }}>
                              {item.status}
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
                            }} onClick={() => handleEditClick(item)}>Edit</button>
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
                  {filteredItems.length === 0 && !showAdd && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", color: "#888", padding: 24 }}>
                        No inventory items found.
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

export default InventoryPage;
