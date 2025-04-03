const db = require('../config/db');

// Add a new supplier
exports.createSuppliers = (req, res) => {
    const { name, contact_number, email, address } = req.body;

    const query = 'INSERT INTO Suppliers (name, contact_number, email, address) VALUES (?, ?, ?, ?)';
    db.query(query, [name, contact_number, email, address], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Supplier  created successfully',
            Suppliers_id: results.insertId
        });
    });
};

// GET a Supplier by ID
exports.getSupplierById = (req, res) => {
    const { supplier_id } = req.params;

    const query = 'SELECT * FROM Suppliers WHERE supplier_id = ?';
    db.query(query, [supplier_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json(results[0]);
    });
};


//UPDATE Supplier details
exports.updateSupplierDetails = (req, res) => {
    const { supplier_id } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(supplier_id);
  
    const query = `UPDATE Suppliers SET ${fields} WHERE supplier_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      res.status(200).json({ message: 'Supplier profile updated successfully' });
    });
  };



 //GET all supplier members details
exports.getAllSupplier = (req, res) => {
    const query = 'SELECT * FROM Suppliers';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ Suppliers: results });
    });
};


//DELETE a Supplier
exports.deleteSupplier = (req, res) => {
    const { supplier_id } = req.params;

    const query = 'DELETE FROM Suppliers WHERE Supplier_id = ?';
    db.query(query, [supplier_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json({ message: 'Supplier deleted successfully' });
    });
};

