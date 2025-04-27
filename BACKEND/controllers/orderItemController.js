const db = require('../config/db');

// ADD items in order
exports.addItemsInOrder = (req, res) => {
  const { order_id } = req.params;
  let items = req.body;
  
  // Handle case where a single item object is sent instead of an array
  if (!Array.isArray(items)) {
    // If it's an object with required fields, convert it to an array
    if (items && typeof items === 'object') {
      items = [items];
    } else {
      return res.status(400).json({ 
        message: 'Items should be an array or a valid item object',
        example: [
          {
            "menu_id": 1,
            "quantity": 2,
            "price": 12.99
          }
        ]
      });
    }
  }
  
  // Check if all required fields are present in each item
  for (const item of items) {
    if (!item.menu_id || !item.quantity || !item.price) {
      return res.status(400).json({ 
        message: 'All fields (menu_id, quantity, price) are required',
        requiredFields: { menu_id: 'required', quantity: 'required', price: 'required' },
        receivedData: item
      });
    }
  }
  
  // First, check if the order exists
  db.query('SELECT * FROM orders WHERE order_id = ?', [order_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ 
        message: `Order with ID ${order_id} not found. Create the order first before adding items.`
      });
    }
    
    // Check if all menu_id values exist in the menu table
    const menuIds = [...new Set(items.map(item => item.menu_id))]; // Get unique menu_ids
    
    db.query('SELECT menu_id FROM menu WHERE menu_id IN (?)', [menuIds], (err, menuResults) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      
      const foundMenuIds = menuResults.map(row => row.menu_id);
      const missingMenuIds = menuIds.filter(id => !foundMenuIds.includes(id));
      
      if (missingMenuIds.length > 0) {
        return res.status(400).json({ 
          message: 'Some menu items do not exist', 
          missingMenuIds 
        });
      }
      
      // Prepare values for bulk insertion
      const values = items.map(item => [
        order_id,
        item.menu_id,
        item.quantity,
        item.price
      ]);
      
      const query = `INSERT INTO order_items 
        (order_id, menu_id, quantity, price) 
        VALUES ?`;
      
      // Use bulk insert for multiple items
      db.query(query, [values], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Database error', error: err.message });
        }
        
        res.status(201).json({
          message: 'Items added to order successfully',
          insertId: results.insertId,
          affectedRows: results.affectedRows
        });
      });
    });
  });
};

//Get list of items for a specific order.
exports.getItemsInOrder = (req, res) => {
    const { order_id } = req.params;

    const query = 'SELECT * FROM order_items WHERE order_id = ?';
    db.query(query, [order_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(results);
    });
};


//Update the quantity of a specific item in an order.
exports.updateItemInOrder = (req, res) => {
    const { order_id, order_item_id } = req.params;
    const { quantity } = req.body;

    // Validate input fields
    if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' });
    }

    const query = 'UPDATE order_items SET quantity = ? WHERE order_id = ? AND order_item_id = ?';
    db.query(query, [quantity, order_id, order_item_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        res.status(200).json({ message: 'Order item updated successfully' });
    });
};

//Remove a specific item from an order.
exports.deleteItemInOrder = (req, res) => {
    const { order_id, order_item_id } = req.params;

    const query = 'DELETE FROM order_items WHERE order_id = ? AND order_item_id = ?';
    db.query(query, [order_id, order_item_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        res.status(200).json({ message: 'Order item deleted successfully' });
    });
};

// Remove all items from an order.
exports.deleteAllItemsInOrder = (req, res) => {
    const { order_id } = req.params;

    const query = 'DELETE FROM order_items WHERE order_id = ?';
    db.query(query, [order_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json({ message: 'All items in order deleted successfully' });
    });
};

