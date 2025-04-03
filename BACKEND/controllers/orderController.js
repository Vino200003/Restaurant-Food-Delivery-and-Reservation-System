const { query } = require('express');
const db = require('../config/db');

// POST /orders - Create an order
exports.createOrder = (req, res) => {
    const { user_id, order_type, order_status, total_amount, delivery_person_id } = req.body;

    const query = 'INSERT INTO Orders (user_id, order_type, order_status, total_amount, delivery_person_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user_id, order_type, order_status, total_amount, delivery_person_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Order created successfully',
            order_id: results.insertId
        });
    });
};

// GET /orders/:order_id - Get order by ID
exports.getOrderById = (req, res) => {
    const { order_id } = req.params;

    const query = 'SELECT * FROM Orders WHERE order_id = ?';
    db.query(query, [order_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
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
            return res.status(500).json({ message: 'Database error' });
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
            return res.status(500).json({ message: 'Database error' });
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
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    });
};
