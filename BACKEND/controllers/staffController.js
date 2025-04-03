const db = require('../config/db');

// Add a new staff member
exports.createStaff = (req, res) => {
    const { first_name, last_name, email, password, phone_number, role } = req.body;

    const query = 'INSERT INTO Staff (first_name, last_name, email, password, phone_number, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, password, phone_number, role], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Staff member created successfully',
            staff_id: results.insertId
        });
    });
};


//GET a staff by id
exports.getStaffById = (req, res) => {
    const { staff_id } = req.params;

    const query = 'SELECT * FROM Staff WHERE staff_id = ?';
    db.query(query, [staff_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.status(200).json(results[0]);
    });
};


//UPDATE staff details
exports.updateStaffDetails = (req, res) => {
    const { staff_id } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(staff_id);
  
    const query = `UPDATE Staff SET ${fields} WHERE staff_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Staff not found' });
      }
  
      res.status(200).json({ message: 'Staff profile updated successfully' });
    });
  };


  //GET all staff members details
exports.getAllStaff = (req, res) => {
    const query = 'SELECT * FROM Staff';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ Staff: results });
    });
};


//DELETE a staff
exports.deleteStaff = (req, res) => {
    const { staff_id } = req.params;

    const query = 'DELETE FROM Staff WHERE staff_id = ?';
    db.query(query, [staff_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        res.status(200).json({ message: 'Staff deleted successfully' });
    });
};

