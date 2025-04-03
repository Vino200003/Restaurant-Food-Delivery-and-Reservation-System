const db = require('../config/db');

// ADD items in order
exports.addItemsInOrder = (req, res) => {
    const { order_id, menu_id, quantity } = req.body;

    // Validate input fields
    if (!order_id || !menu_id || !quantity) {
        return res.status(400).json({ message: 'All fields (order_id, menu_id, quantity) are required' });
    }

    const query = 'INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)';
    db.query(query, [order_id, menu_id, quantity], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(201).json({
            message: 'Order Item added successfully',
            order_item_id: results.insertId
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

