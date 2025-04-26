import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const initialProfile = {
  name: "Admin User",
  email: "admin@example.com",
  phone: "+94 71 123 4567"
};

const initialRestaurant = {
  name: "Vanni Inn Restaurant",
  address: "123 Main St, Vavuniya",
  phone: "+94 24 222 3333"
};

const SettingsPage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [restaurant, setRestaurant] = useState(initialRestaurant);

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [profileDraft, setProfileDraft] = useState(initialProfile);
  const [restaurantDraft, setRestaurantDraft] = useState(initialRestaurant);

  const [showPassword, setShowPassword] = useState(false);
  const [resetPwd, setResetPwd] = useState({ old: "", new1: "", new2: "" });
  const [pwdError, setPwdError] = useState("");

  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfileDraft(prev => ({ ...prev, [name]: value }));
  };

  const handleRestaurantChange = e => {
    const { name, value } = e.target;
    setRestaurantDraft(prev => ({ ...prev, [name]: value }));
  };

  const handlePwdChange = e => {
    const { name, value } = e.target;
    setResetPwd(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileEdit = () => {
    setProfileDraft(profile);
    setEditingProfile(true);
  };

  const handleProfileCancel = e => {
    e && e.preventDefault();
    setEditingProfile(false);
    setProfileDraft(profile);
  };

  const handleProfileSave = e => {
    e.preventDefault();
    setProfile(profileDraft);
    setEditingProfile(false);
    alert("Profile updated!");
  };

  const handleRestaurantEdit = () => {
    setRestaurantDraft(restaurant);
    setEditingRestaurant(true);
  };

  const handleRestaurantCancel = e => {
    e && e.preventDefault();
    setEditingRestaurant(false);
    setRestaurantDraft(restaurant);
  };

  const handleRestaurantSave = e => {
    e.preventDefault();
    setRestaurant(restaurantDraft);
    setEditingRestaurant(false);
    alert("Restaurant settings updated!");
  };

  const handlePwdReset = e => {
    e.preventDefault();
    setPwdError("");
    if (!resetPwd.old || !resetPwd.new1 || !resetPwd.new2) {
      setPwdError("All fields are required.");
      return;
    }
    if (resetPwd.new1 !== resetPwd.new2) {
      setPwdError("New passwords do not match.");
      return;
    }
    // Add real password validation here
    setShowPassword(false);
    setResetPwd({ old: "", new1: "", new2: "" });
    alert("Password reset successful!");
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
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Settings</div>
            <div style={{ color: "#6b7280", marginBottom: 24, fontSize: 16 }}>
              Manage your admin profile and restaurant settings
            </div>
            <div style={{
              display: "flex",
              gap: 32,
              flexWrap: "wrap"
            }}>
              {/* Profile Settings */}
              <form onSubmit={handleProfileSave} style={{
                flex: 1,
                minWidth: 320,
                background: "#f9fafb",
                borderRadius: 12,
                boxShadow: "0 1px 4px #0001",
                padding: 28,
                marginBottom: 32
              }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, flex: 1 }}>Admin Profile</div>
                  {!editingProfile && (
                    <button
                      type="button"
                      style={{
                        background: "#fbeee6",
                        color: "#d97706",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 18px",
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: "pointer"
                      }}
                      onClick={handleProfileEdit}
                    >Edit</button>
                  )}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 500, fontSize: 15 }}>Name</label>
                  <input
                    name="name"
                    value={editingProfile ? profileDraft.name : profile.name}
                    onChange={handleProfileChange}
                    disabled={!editingProfile}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 15,
                      marginTop: 4,
                      background: editingProfile ? "#fff" : "#f3f4f6"
                    }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 500, fontSize: 15 }}>Email</label>
                  <input
                    name="email"
                    value={editingProfile ? profileDraft.email : profile.email}
                    onChange={handleProfileChange}
                    disabled={!editingProfile}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 15,
                      marginTop: 4,
                      background: editingProfile ? "#fff" : "#f3f4f6"
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontWeight: 500, fontSize: 15 }}>Phone</label>
                  <input
                    name="phone"
                    value={editingProfile ? profileDraft.phone : profile.phone}
                    onChange={handleProfileChange}
                    disabled={!editingProfile}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 15,
                      marginTop: 4,
                      background: editingProfile ? "#fff" : "#f3f4f6"
                    }}
                  />
                </div>
                {editingProfile && (
                  <div>
                    <button type="submit" style={{
                      background: "#e7fbe6",
                      color: "#16a34a",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer",
                      marginRight: 12
                    }}>Save</button>
                    <button type="button" style={{
                      background: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer"
                    }} onClick={handleProfileCancel}>Cancel</button>
                  </div>
                )}
              </form>
              {/* Restaurant Settings */}
              <form onSubmit={handleRestaurantSave} style={{
                flex: 1,
                minWidth: 320,
                background: "#f9fafb",
                borderRadius: 12,
                boxShadow: "0 1px 4px #0001",
                padding: 28,
                marginBottom: 32
              }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, flex: 1 }}>Restaurant Info</div>
                  {!editingRestaurant && (
                    <button
                      type="button"
                      style={{
                        background: "#fbeee6",
                        color: "#d97706",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 18px",
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: "pointer"
                      }}
                      onClick={handleRestaurantEdit}
                    >Edit</button>
                  )}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 500, fontSize: 15 }}>Restaurant Name</label>
                  <input
                    name="name"
                    value={editingRestaurant ? restaurantDraft.name : restaurant.name}
                    onChange={handleRestaurantChange}
                    disabled={!editingRestaurant}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 15,
                      marginTop: 4,
                      background: editingRestaurant ? "#fff" : "#f3f4f6"
                    }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontWeight: 500, fontSize: 15 }}>Address</label>
                  <input
                    name="address"
                    value={editingRestaurant ? restaurantDraft.address : restaurant.address}
                    onChange={handleRestaurantChange}
                    disabled={!editingRestaurant}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 15,
                      marginTop: 4,
                      background: editingRestaurant ? "#fff" : "#f3f4f6"
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontWeight: 500, fontSize: 15 }}>Phone</label>
                  <input
                    name="phone"
                    value={editingRestaurant ? restaurantDraft.phone : restaurant.phone}
                    onChange={handleRestaurantChange}
                    disabled={!editingRestaurant}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 15,
                      marginTop: 4,
                      background: editingRestaurant ? "#fff" : "#f3f4f6"
                    }}
                  />
                </div>
                {editingRestaurant && (
                  <div>
                    <button type="submit" style={{
                      background: "#e7fbe6",
                      color: "#16a34a",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer",
                      marginRight: 12
                    }}>Save</button>
                    <button type="button" style={{
                      background: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 24px",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer"
                    }} onClick={handleRestaurantCancel}>Cancel</button>
                  </div>
                )}
              </form>
            </div>
            {/* Password Reset Section */}
            <div style={{
              maxWidth: 400,
              background: "#f9fafb",
              borderRadius: 12,
              boxShadow: "0 1px 4px #0001",
              padding: 28,
              marginTop: 0
            }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, display: "flex", alignItems: "center" }}>
                Password
                {!showPassword && (
                  <button
                    type="button"
                    style={{
                      background: "#fbeee6",
                      color: "#d97706",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 18px",
                      fontWeight: 500,
                      fontSize: 15,
                      cursor: "pointer",
                      marginLeft: "auto"
                    }}
                    onClick={() => setShowPassword(true)}
                  >Reset Password</button>
                )}
              </div>
              {showPassword && (
                <form onSubmit={handlePwdReset}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontWeight: 500, fontSize: 15 }}>Current Password</label>
                    <input
                      type="password"
                      name="old"
                      value={resetPwd.old}
                      onChange={handlePwdChange}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        fontSize: 15,
                        marginTop: 4
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontWeight: 500, fontSize: 15 }}>New Password</label>
                    <input
                      type="password"
                      name="new1"
                      value={resetPwd.new1}
                      onChange={handlePwdChange}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        fontSize: 15,
                        marginTop: 4
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 500, fontSize: 15 }}>Confirm New Password</label>
                    <input
                      type="password"
                      name="new2"
                      value={resetPwd.new2}
                      onChange={handlePwdChange}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        fontSize: 15,
                        marginTop: 4
                      }}
                    />
                  </div>
                  {pwdError && (
                    <div style={{ color: "#dc2626", marginBottom: 10, fontSize: 14 }}>{pwdError}</div>
                  )}
                  <button type="submit" style={{
                    background: "#e7fbe6",
                    color: "#16a34a",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    marginRight: 12
                  }}>Save</button>
                  <button type="button" style={{
                    background: "#fee2e2",
                    color: "#dc2626",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer"
                  }} onClick={() => {
                    setShowPassword(false);
                    setPwdError("");
                    setResetPwd({ old: "", new1: "", new2: "" });
                  }}>Cancel</button>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
