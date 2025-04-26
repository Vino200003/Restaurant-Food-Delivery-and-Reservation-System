const db = require('../config/db');

// Create a new Menu
exports.createMenu = (req, res) => {
    const { menu_name, price, status, category_code, subcategory_code, image_url } = req.body;

    // Validate required fields
    if (!menu_name || !price || !category_code) {
        return res.status(400).json({ message: 'Menu name, price, and category code are required' });
    }

    const query = 'INSERT INTO menu (menu_name, price, status, category_code, subcategory_code, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [menu_name, price, status || 'available', category_code, subcategory_code || null, image_url || null], (err, results) => {
        if (err) {
            console.error('Error creating menu:', err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: 'Invalid category or subcategory code' });
            }
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Menu created successfully',
            menu_id: results.insertId
        });
    });
};

// GET a menu details using menu_id
exports.getMenuById = (req, res) => {
    const { menu_id } = req.params;

    const query = `
        SELECT m.*, c.category_name, sc.subcategory_name
        FROM menu m
        LEFT JOIN categories c ON m.category_code = c.category_code
        LEFT JOIN subcategories sc ON m.subcategory_code = sc.subcategory_code
        WHERE m.menu_id = ?
    `;
    
    db.query(query, [menu_id], (err, results) => {
        if (err) {
            console.error('Error fetching menu:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.status(200).json(results[0]);
    });
};

// UPDATE menu details
exports.updateMenuDetails = (req, res) => {
    const { menu_id } = req.params;
    const { menu_name, price, status, category_code, subcategory_code, image_url } = req.body;
  
    // Build the query dynamically
    const updates = {};
    if (menu_name !== undefined) updates.menu_name = menu_name;
    if (price !== undefined) updates.price = price;
    if (status !== undefined) updates.status = status;
    if (category_code !== undefined) updates.category_code = category_code;
    if (subcategory_code !== undefined) updates.subcategory_code = subcategory_code;
    if (image_url !== undefined) updates.image_url = image_url;
    
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No fields to update provided' });
    }
    
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(menu_id);
  
    const query = `UPDATE menu SET ${fields} WHERE menu_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error updating menu:', err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Invalid category or subcategory code' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Menu not found' });
      }
  
      res.status(200).json({ message: 'Menu details updated successfully' });
    });
};

// GET all menu details
exports.getAllMenu = (req, res) => {
    const query = `
        SELECT m.*, c.category_name, sc.subcategory_name
        FROM menu m
        LEFT JOIN categories c ON m.category_code = c.category_code
        LEFT JOIN subcategories sc ON m.subcategory_code = sc.subcategory_code
        ORDER BY m.menu_name
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ menu: results });
    });
};

// GET menu by category
exports.getMenuByCategory = (req, res) => {
    const { category_code } = req.params;

    const query = `
        SELECT m.*, c.category_name, sc.subcategory_name
        FROM menu m
        LEFT JOIN categories c ON m.category_code = c.category_code
        LEFT JOIN subcategories sc ON m.subcategory_code = sc.subcategory_code
        WHERE m.category_code = ?
        ORDER BY m.menu_name
    `;

    db.query(query, [category_code], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ menu: results });
    });
};

// GET menu by subcategory
exports.getMenuBySubcategory = (req, res) => {
    const { subcategory_code } = req.params;

    const query = `
        SELECT m.*, c.category_name, sc.subcategory_name
        FROM menu m
        LEFT JOIN categories c ON m.category_code = c.category_code
        LEFT JOIN subcategories sc ON m.subcategory_code = sc.subcategory_code
        WHERE m.subcategory_code = ?
        ORDER BY m.menu_name
    `;

    db.query(query, [subcategory_code], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ menu: results });
    });
};

// DELETE a Menu
exports.deleteMenu = (req, res) => {
    const { menu_id } = req.params;

    const query = 'DELETE FROM menu WHERE menu_id = ?';
    db.query(query, [menu_id], (err, results) => {
        if (err) {
            console.error('Error deleting menu:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json({ message: 'Menu deleted successfully' });
    });
};