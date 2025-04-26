import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./MenuPage.css";

// Example menu data with categories, images, prices, and descriptions
const initialMenuItems = [
  { 
    id: 1, 
    name: "Margherita Pizza", 
    category: "Pizza", 
    price: 1200, 
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: true,
    available: true
  },
  { 
    id: 2, 
    name: "Spaghetti Carbonara", 
    category: "Pasta", 
    price: 950, 
    description: "Creamy pasta with eggs, cheese, pancetta, and black pepper",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: false,
    available: true
  },
  { 
    id: 3, 
    name: "Caesar Salad", 
    category: "Salads", 
    price: 750, 
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: false,
    available: true
  },
  { 
    id: 4, 
    name: "Chicken Tikka Masala", 
    category: "Main Courses", 
    price: 1400, 
    description: "Grilled chicken in a creamy tomato sauce with Indian spices",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: true,
    available: true
  },
  { 
    id: 5, 
    name: "Chocolate Lava Cake", 
    category: "Desserts", 
    price: 650, 
    description: "Warm chocolate cake with a molten chocolate center",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: false,
    available: true
  },
  { 
    id: 6, 
    name: "Vegetable Stir Fry", 
    category: "Vegetarian", 
    price: 850, 
    description: "Mixed vegetables stir-fried with soy sauce and ginger",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: false,
    available: false
  },
  { 
    id: 7, 
    name: "Beef Burger", 
    category: "Burgers", 
    price: 1050, 
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: true,
    available: true
  },
  { 
    id: 8, 
    name: "Mango Lassi", 
    category: "Beverages", 
    price: 350, 
    description: "Refreshing yogurt drink with mango and cardamom",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featured: false,
    available: true
  }
];

const emptyMenuItem = {
  name: "",
  category: "",
  subcategory: "",
  price: "",
  image: "",
  featured: false,
  available: true
};

const MenuPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Items");
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState(emptyMenuItem);
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState({});
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [categories, setCategories] = useState(["All Categories", ...Array.from(new Set(menuItems.map(item => item.category)))]);
  const [subcategories, setSubcategories] = useState(Array.from(new Set(menuItems.filter(item => item.subcategory).map(item => item.subcategory))));
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showNewSubcategory, setShowNewSubcategory] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState("");
  
  // Filtering logic
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "All Items" || 
                         (statusFilter === "Available" && item.available) ||
                         (statusFilter === "Unavailable" && !item.available) ||
                         (statusFilter === "Featured" && item.featured);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle drag and drop
  const handleDragStart = (id) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetId) => {
    if (draggedItemId === targetId) return;
    
    const draggedItemIndex = menuItems.findIndex(item => item.id === draggedItemId);
    const targetItemIndex = menuItems.findIndex(item => item.id === targetId);
    
    const newItems = [...menuItems];
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(targetItemIndex, 0, draggedItem);
    
    setMenuItems(newItems);
    setDraggedItemId(null);
  };

  // Handle add new item
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewItem(prev => ({ ...prev, [name]: newValue }));
  };

  const handleAddSave = () => {
    if (!newItem.name || !newItem.category || !newItem.price) return;
    
    setMenuItems(prev => {
      // Filter out any placeholder items
      const filteredItems = prev.filter(item => item.name !== "Placeholder");
      
      // Add the new item
      return [
        ...filteredItems,
        {
          ...newItem,
          id: prev.length ? Math.max(...prev.map(item => item.id)) + 1 : 1,
          price: parseFloat(newItem.price)
        }
      ];
    });
    
    setShowAdd(false);
    setNewItem(emptyMenuItem);
    setShowNewCategory(false);
    setShowNewSubcategory(false);
  };

  // Handle edit item
  const handleEditClick = (item) => {
    setEditId(item.id);
    setEditItem({ ...item });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditItem(prev => ({ ...prev, [name]: newValue }));
  };

  const handleEditSave = () => {
    setMenuItems(prev => prev.map(item => 
      item.id === editId ? { ...editItem, price: parseFloat(editItem.price) } : item
    ));
    setEditId(null);
    setEditItem({});
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditItem({});
  };

  // Handle delete item
  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // Toggle item availability
  const toggleAvailability = (id) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  // Toggle featured status
  const toggleFeatured = (id) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (value === "new") {
      setShowNewCategory(true);
    } else {
      setNewItem(prev => ({ ...prev, category: value }));
    }
  };
  
  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      // Update the current form item with the new category
      setNewItem(prev => ({ ...prev, category: newCategory.trim() }));
      
      // Add the new category to the categories state if it doesn't exist
      if (!categories.includes(newCategory.trim())) {
        setCategories(prev => [...prev, newCategory.trim()]);
      }
      
      // Hide the new category input
      setShowNewCategory(false);
      setNewCategory("");
    }
  };
  
  const handleSubcategoryChange = (e) => {
    const { value } = e.target;
    if (value === "new") {
      setShowNewSubcategory(true);
    } else {
      setNewItem(prev => ({ ...prev, subcategory: value }));
    }
  };
  
  const handleAddNewSubcategory = () => {
    if (newSubcategory.trim()) {
      // Update the current form item with the new subcategory
      setNewItem(prev => ({ ...prev, subcategory: newSubcategory.trim() }));
      
      // Add the new subcategory to the subcategories state if it doesn't exist
      if (!subcategories.includes(newSubcategory.trim())) {
        setSubcategories(prev => [...prev, newSubcategory.trim()]);
      }
      
      // Hide the new subcategory input
      setShowNewSubcategory(false);
      setNewSubcategory("");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="menu-page-container">
        <div className="menu-page-inner">
          <AdminSidebar />
          <main className="menu-page-main">
            <div className="menu-page-header">
              <div>
                <h1>Menu Management</h1>
                <p>Create, update or remove menu items</p>
              </div>
              
              <button className="menu-add-btn" onClick={() => setShowAdd(true)}>
                <span>+</span> Add Item
              </button>
            </div>
            
            <div className="menu-filters">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              
              <div className="menu-filter-controls">
                <div className="filter-group">
                  <span>View:</span>
                  <div className="view-toggle">
                    <button 
                      className={viewMode === "grid" ? "active" : ""} 
                      onClick={() => setViewMode("grid")}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                      </svg>
                    </button>
                    <button 
                      className={viewMode === "list" ? "active" : ""} 
                      onClick={() => setViewMode("list")}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="filter-group">
                  <span>Category:</span>
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <span>Status:</span>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    <option value="All Items">All Items</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Featured">Featured</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Add new item form */}
            {showAdd && (
              <div className="menu-add-modal">
                <div className="menu-add-modal-content">
                  <div className="modal-header">
                    <h3>Add New Menu Item</h3>
                    <button 
                      className="close-modal" 
                      onClick={() => {
                        setShowAdd(false);
                        setNewItem(emptyMenuItem);
                        setShowNewCategory(false);
                        setShowNewSubcategory(false);
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-row">
                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={newItem.name}
                          onChange={handleAddChange}
                          placeholder="Menu item name"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Category</label>
                        {showNewCategory ? (
                          <div className="new-category-input">
                            <input
                              type="text"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Type new category"
                              autoFocus
                            />
                            <div className="new-category-actions">
                              <button 
                                className="add-new-btn" 
                                onClick={handleAddNewCategory}
                                disabled={!newCategory.trim()}
                              >
                                Add
                              </button>
                              <button 
                                className="cancel-new-btn" 
                                onClick={() => {
                                  setShowNewCategory(false);
                                  setNewCategory("");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <select
                            value={newItem.category}
                            onChange={handleCategoryChange}
                            required
                          >
                            <option value="" disabled>Select category</option>
                            {categories
                              .filter(cat => cat !== "All Categories")
                              .map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))
                            }
                            <option value="new">+ Add New Category</option>
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label>Subcategory</label>
                        {showNewSubcategory ? (
                          <div className="new-category-input">
                            <input
                              type="text"
                              value={newSubcategory}
                              onChange={(e) => setNewSubcategory(e.target.value)}
                              placeholder="Type new subcategory"
                              autoFocus
                            />
                            <div className="new-category-actions">
                              <button 
                                className="add-new-btn" 
                                onClick={handleAddNewSubcategory}
                                disabled={!newSubcategory.trim()}
                              >
                                Add
                              </button>
                              <button 
                                className="cancel-new-btn" 
                                onClick={() => {
                                  setShowNewSubcategory(false);
                                  setNewSubcategory("");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <select
                            value={newItem.subcategory}
                            onChange={handleSubcategoryChange}
                          >
                            <option value="">Select subcategory (optional)</option>
                            {subcategories.map(subcat => (
                              <option key={subcat} value={subcat}>{subcat}</option>
                            ))}
                            <option value="new">+ Add New Subcategory</option>
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label>Price (LKR)</label>
                        <input
                          type="number"
                          name="price"
                          value={newItem.price}
                          onChange={handleAddChange}
                          placeholder="0"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Image URL</label>
                        <div className="image-url-input">
                          <input
                            type="text"
                            name="image"
                            value={newItem.image}
                            onChange={handleAddChange}
                            placeholder="https://example.com/image.jpg"
                          />
                          <button className="image-browse-btn">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="form-row toggle-options">
                      <div className="toggle-field">
                        <label>Featured Item</label>
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            id="featuredNew"
                            name="featured"
                            checked={newItem.featured}
                            onChange={handleAddChange}
                          />
                          <label htmlFor="featuredNew" className="toggle-label"></label>
                        </div>
                      </div>
                      <div className="toggle-field">
                        <label>Available</label>
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            id="availableNew"
                            name="available"
                            checked={newItem.available}
                            onChange={handleAddChange}
                          />
                          <label htmlFor="availableNew" className="toggle-label"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-cancel" 
                      onClick={() => {
                        setShowAdd(false);
                        setNewItem(emptyMenuItem);
                        setShowNewCategory(false);
                        setShowNewSubcategory(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-save" 
                      onClick={handleAddSave}
                      disabled={!newItem.name || !newItem.category || !newItem.price}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* No items message */}
            {filteredItems.length === 0 && (
              <div className="no-items-message">
                <svg width="64" height="64" fill="#d1d5db" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
                <p>No menu items found. Try adjusting your filters or add a new item.</p>
              </div>
            )}
            
            {/* Grid View */}
            {viewMode === "grid" && filteredItems.length > 0 && (
              <div className="menu-grid">
                {filteredItems.map(item => (
                  <div 
                    key={item.id} 
                    className={`menu-card ${!item.available ? 'unavailable' : ''} ${item.id === editId ? 'editing' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(item.id)}
                  >
                    {item.id === editId ? (
                      // Edit mode
                      <div className="edit-form">
                        <div className="form-row">
                          <input
                            type="text"
                            name="name"
                            value={editItem.name}
                            onChange={handleEditChange}
                            placeholder="Item name"
                          />
                        </div>
                        <div className="form-row">
                          <input
                            type="text"
                            name="category"
                            value={editItem.category}
                            onChange={handleEditChange}
                            placeholder="Category"
                            list="categories-edit"
                          />
                          <datalist id="categories-edit">
                            {categories.filter(cat => cat !== "All Categories").map(cat => (
                              <option key={cat} value={cat} />
                            ))}
                          </datalist>
                        </div>
                        <div className="form-row">
                          <input
                            type="number"
                            name="price"
                            value={editItem.price}
                            onChange={handleEditChange}
                            placeholder="Price"
                          />
                        </div>
                        <div className="form-row">
                          <input
                            type="text"
                            name="subcategory"
                            value={editItem.subcategory}
                            onChange={handleEditChange}
                            placeholder="Subcategory"
                          />
                        </div>
                        <div className="form-row">
                          <input
                            type="text"
                            name="image"
                            value={editItem.image}
                            onChange={handleEditChange}
                            placeholder="Image URL"
                          />
                        </div>
                        <div className="form-row checkbox-row">
                          <div>
                            <input
                              type="checkbox"
                              id={`featured-${item.id}`}
                              name="featured"
                              checked={editItem.featured}
                              onChange={handleEditChange}
                            />
                            <label htmlFor={`featured-${item.id}`}>Featured</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id={`available-${item.id}`}
                              name="available"
                              checked={editItem.available}
                              onChange={handleEditChange}
                            />
                            <label htmlFor={`available-${item.id}`}>Available</label>
                          </div>
                        </div>
                        <div className="edit-actions">
                          <button className="btn-save" onClick={handleEditSave}>Save</button>
                          <button className="btn-cancel" onClick={handleEditCancel}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      // Display mode
                      <>
                        <div className="menu-card-img">
                          {item.image ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <div className="no-image">No Image</div>
                          )}
                          {item.featured && <span className="featured-badge">Featured</span>}
                          {!item.available && <div className="unavailable-overlay">Unavailable</div>}
                        </div>
                        <div className="menu-card-content">
                          <div className="menu-card-header">
                            <h3>{item.name}</h3>
                            <span className="price">LKR {item.price.toFixed(0)}</span>
                          </div>
                          <div className="category">{item.category}</div>
                          <p className="description">{item.description}</p>
                          <div className="menu-card-actions">
                            <button 
                              className="action-btn edit" 
                              onClick={() => handleEditClick(item)}
                            >
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                              </svg>
                            </button>
                            <button 
                              className="action-btn toggle" 
                              onClick={() => toggleAvailability(item.id)}
                            >
                              {item.available ? (
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>
                              ) : (
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                </svg>
                              )}
                            </button>
                            <button 
                              className="action-btn star" 
                              onClick={() => toggleFeatured(item.id)}
                            >
                              {item.featured ? (
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                              ) : (
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                </svg>
                              )}
                            </button>
                            <button 
                              className="action-btn delete" 
                              onClick={() => handleDeleteClick(item.id)}
                            >
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* List View */}
            {viewMode === "list" && filteredItems.length > 0 && (
              <div className="menu-list">
                <table className="menu-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr 
                        key={item.id}
                        className={!item.available ? 'unavailable' : ''}
                        draggable
                        onDragStart={() => handleDragStart(item.id)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(item.id)}
                      >
                        <td className="img-cell">
                          {item.image ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <div className="no-image-small">NA</div>
                          )}
                        </td>
                        <td className="name-cell">
                          <div>{item.name}</div>
                          <small>{item.description}</small>
                        </td>
                        <td>{item.category}</td>
                        <td>LKR {item.price.toFixed(0)}</td>
                        <td>
                          <span className={`status-badge ${item.available ? 'available' : 'unavailable'}`}>
                            {item.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="featured-cell">
                          {item.featured ? (
                            <span className="featured-icon">
                              <svg width="16" height="16" fill="#d97706" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                              </svg>
                            </span>
                          ) : '-'}
                        </td>
                        <td className="actions-cell">
                          <button 
                            className="table-btn edit" 
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          <button 
                            className="table-btn toggle" 
                            onClick={() => toggleAvailability(item.id)}
                          >
                            {item.available ? 'Disable' : 'Enable'}
                          </button>
                          <button 
                            className="table-btn delete" 
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
