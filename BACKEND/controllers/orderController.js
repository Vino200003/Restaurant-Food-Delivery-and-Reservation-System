const { query } = require('express');
const db = require('../config/db');

// POST /orders - Create an order
exports.createOrder = (req, res) => {
  const { user_id, order_type, total_amount, delivery_person_id = null } = req.body;
  
  // Validate required fields
  if (!user_id || !order_type || !total_amount) {
    return res.status(400).json({ 
      message: 'Missing required fields', 
      required: ['user_id', 'order_type', 'total_amount']
    });
  }
  
  // Check if order_type is valid according to your ENUM
  const validOrderTypes = ['Dine-in', 'Takeaway', 'Delivery'];
  if (!validOrderTypes.includes(order_type)) {
    return res.status(400).json({ 
      message: 'Invalid order_type', 
      allowed: validOrderTypes
    });
  }
  
  // Set default order_status to 'Pending' (which aligns with your DB default)
  const order_status = 'Pending';
  
  // First verify the user exists
  db.query('SELECT user_id FROM users WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('User verification error:', err);
      return res.status(500).json({ 
        message: 'Database error during user verification', 
        error: err.message,
        sqlState: err.sqlState,
        sqlCode: err.code
      });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: `User with ID ${user_id} not found` });
    }
    
    // If delivery_person_id is provided, verify they exist and are a delivery person
    if (delivery_person_id) {
      db.query('SELECT staff_id, role FROM staff WHERE staff_id = ?', [delivery_person_id], (err, staffResults) => {
        if (err) {
          console.error('Staff verification error:', err);
          return res.status(500).json({ 
            message: 'Database error during staff verification', 
            error: err.message,
            sqlState: err.sqlState,
            sqlCode: err.code
          });
        }
        
        if (staffResults.length === 0) {
          return res.status(404).json({ message: `Staff with ID ${delivery_person_id} not found` });
        }
        
        if (staffResults[0].role !== 'delivery') {
          return res.status(400).json({ 
            message: `Staff with ID ${delivery_person_id} is not a delivery person`,
            current_role: staffResults[0].role
          });
        }
        
        insertOrder();
      });
    } else {
      insertOrder();
    }
    
    function insertOrder() {
      const query = 'INSERT INTO orders (user_id, order_type, order_status, total_amount, delivery_person_id) VALUES (?, ?, ?, ?, ?)';
      
      db.query(query, [user_id, order_type, order_status, total_amount, delivery_person_id], (err, results) => {
        if (err) {
          console.error('Order creation error:', err);
          return res.status(500).json({ 
            message: 'Database error during order creation', 
            error: err.message,
            sqlState: err.sqlState,
            sqlCode: err.code
          });
        }
        
        res.status(201).json({
          message: 'Order created successfully',
          order_id: results.insertId,
          order_status: order_status
        });
      });
    }
  });
};

// GET /orders/:order_id - Get order by ID
exports.getOrderById = (req, res) => {
    const { order_id } = req.params;

    const query = 'SELECT * FROM Orders WHERE order_id = ?';
    db.query(query, [order_id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(results[0]);
    });
};

// PUT /orders/:order_id/status - Update order status
exports.updateOrderStatus = (req, res) => {
    const { order_id } = req.params;
    const { order_status } = req.body;

    const query = 'UPDATE Orders SET order_status = ? WHERE order_id = ?';
    db.query(query, [order_status, order_id], (err, results) => {
        if (err) {
            console.error('Database update error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully' });
    });
};

// GET /users/:user_id/orders - Get orders by user ID
exports.getOrdersByUser = (req, res) => {
    const { user_id } = req.params;

    const query = 'SELECT * FROM Orders WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(results);
    });
};



// GET All orders
exports.getAllOrders = (req, res) => {
    const query = 'SELECT * FROM Orders';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ orders: results });
    });
};



//Cancel an order (DELETE a order by using order ID)
exports.deleteOrder = (req, res) => {
    const { order_id } = req.params;

    const query = 'DELETE FROM Orders WHERE order_id = ?';
    db.query(query, [order_id], (err, results) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    });
};
