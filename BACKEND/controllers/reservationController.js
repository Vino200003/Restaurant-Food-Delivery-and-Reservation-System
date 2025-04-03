const db = require('../config/db');

// CREATE a new reservation
exports.createReservation = (req, res) => {
    const { user_id, table_no, special_requests, date_time } = req.body;

    const query = 'INSERT INTO reservations (user_id, table_no, special_requests, date_time) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, table_no, special_requests, date_time], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the error
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(201).json({
            message: 'Reservation created successfully',
            reservation_id: results.insertId
        });
    });
};

//GET a reservation using reservation_id
exports.getReservationById = (req, res) => {
    const { reserve_id } = req.params;

    const query = 'SELECT * FROM Reservations WHERE reserve_id = ?';
    db.query(query, [reserve_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Reservations not found' });
        }

        res.status(200).json(results[0]);
    });
};


//UPDATE reservation details
exports.updateReservationDetails = (req, res) => {
    const { reserve_id } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(reserve_id);
  
    const query = `UPDATE reservations SET ${fields} WHERE reserve_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Reservations not found' });
      }
  
      res.status(200).json({ message: 'Reservations profile updated successfully' });
    });
  };


  //GET all reservations
exports.getAllReservations = (req, res) => {
    const query = 'SELECT * FROM Reservations';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ Reservations: results });
    });
};


//DELETE a reservation by using reservation ID
exports.deleteReservation = (req, res) => {
    const { reserve_id } = req.params;

    const query = 'DELETE FROM Reservations WHERE reserve_id = ?';
    db.query(query, [reserve_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Reservations not found' });
        }
        res.status(200).json({ message: 'Reservations deleted successfully' });
    });
};
