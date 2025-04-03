const db = require('../config/db');

// Create a new payment entry when an order is being paid.

exports.addPaymentEntry = (req, res) => {
    const { order_id, payment_type, payment_status, amount } = req.body;

    

    const query = 'INSERT INTO payments (order_id, payment_type, payment_status, amount) VALUES (?, ?, ?, ?)';
    db.query(query, [order_id, payment_type, payment_status, amount], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(201).json({
            message: 'Paymeny entry added successfully',
            payment_id: results.insertId
        });
    });
};


//Get the payment details for a specific order.
exports.getPaymentDetails = (req, res) => {
    const { order_id } = req.params;

    const query = 'SELECT * FROM payments WHERE order_id = ?';
    db.query(query, [order_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(results);
    });
};

//Update the status of a payment entry.
exports.updatePaymentStatus = (req, res) => {
    const { payment_id } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(payment_id);
  
    const query = `UPDATE payments SET ${fields} WHERE payment_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      res.status(200).json({ message: 'Payment details updated successfully' });
    });
  };

  //GET all payment details 
    exports.getAllPaymentDetails = (req, res) => {
        const query = 'SELECT * FROM payments';
        db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
    
        res.status(200).json(results);
        });
    };