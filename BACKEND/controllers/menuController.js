
const db = require('../config/db');

// Create a new Menu
exports.createMenu = (req, res) => {
    const {  menu_name, price, status, category_code } = req.body;

    const query = 'INSERT INTO Menu ( menu_name, price, status, category_code) VALUES (?, ?, ?, ?)';
    db.query(query, [ menu_name, price, status, category_code], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Menu created successfully',
            menu_id: results.insertId
        });
    });
};


//GET a menu details using menu_id

exports.getMenuById = (req, res) => {
    const { menu_id } = req.params;

    const query = 'SELECT * FROM Menu WHERE menu_id = ?';
    db.query(query, [menu_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.status(200).json(results[0]);
    });
};


//UPDATE menu details
exports.updateMenuDetails = (req, res) => {
    const { menu_id } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(menu_id);
  
    const query = `UPDATE Menu SET ${fields} WHERE menu_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Menu not found' });
      }
  
      res.status(200).json({ message: 'Menu details updated successfully' });
    });
  };


  //GET all menu details
exports.getAllMenu = (req, res) => {
    const query = 'SELECT * FROM Menu';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ Menu: results });
    });
};



// DELETE a Menu
exports.deleteMenu = (req, res) => {
    const { menu_id } = req.params;

    const query = 'DELETE FROM Menu WHERE menu_id = ?';
    db.query(query, [menu_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json({ message: 'Menu deleted successfully' });
    });
};