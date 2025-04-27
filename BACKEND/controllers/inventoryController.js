const db = require('../config/db');

// Create a new Inventory
exports.createInventory = (req, res) => {
  // Match columns exactly to your inventory table structure
  const { name, quantity, unit, manu_date, exp_date, status, supplier_id } = req.body;
  
  // Validate required fields
  if (!name || !quantity || !unit) {
    return res.status(400).json({
      message: 'Name, quantity, and unit are required fields',
      required: ['name', 'quantity', 'unit'],
      received: req.body
    });
  }
  
  // Set default status if not provided
  const inventoryStatus = status || 'available';
  
  // Log the received data for debugging
  console.log('Creating inventory with data:', {
    name, quantity, unit, manu_date, exp_date, status: inventoryStatus, supplier_id
  });
  
  // Match column names and placeholders to your table structure
  const query = `
    INSERT INTO inventory 
    (name, quantity, unit, manu_date, exp_date, status, supplier_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  // Ensure all values are properly passed and in the correct order
  db.query(
    query, 
    [name, quantity, unit, manu_date || null, exp_date || null, inventoryStatus, supplier_id || null], 
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          message: 'Database error', 
          error: err.message,
          sql: err.sql // Log the SQL that caused the error
        });
      }
      
      res.status(201).json({
        message: 'Inventory item created successfully',
        inventory_id: results.insertId
      });
    }
  );
};

// Get details of an inventory item
exports.getInventoryById = (req, res) => {
    const { inventory_id } = req.params;

    const query = 'SELECT * FROM inventory WHERE inventory_id = ?';
    db.query(query, [inventory_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        res.status(200).json(results);
    });
};

//Update an inventory item.
exports.updateInventoryDetails = (req, res) => {
    const { inventory_id } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(inventory_id);
  
    const query = `UPDATE Inventory SET ${fields} WHERE inventory_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Inventory not found' });
      }
  
      res.status(200).json({ message: 'Inventory details updated successfully' });
    });
  };

  //Get the list of items in inventory.
exports.getAllInventory = (req, res) => {
    const query = 'SELECT * FROM inventory';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(results);
    });
};

//Delete an inventory item.
exports.deleteInventory = (req, res) => {
    const { inventory_id } = req.params;

    const query = 'DELETE FROM inventory WHERE inventory_id = ?';
    db.query(query, [inventory_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

                res.status(200).json({ message: 'Inventory deleted successfully' });
            });
        }
    ;