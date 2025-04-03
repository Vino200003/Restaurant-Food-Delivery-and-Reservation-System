const db = require('../config/db');

// Submit feedback for an order
exports.createFeedback = (req, res) => {
    const { user_id, order_id, rating, comments } = req.body;

    
    

    const query = 'INSERT INTO feedback (user_id, order_id, rating, comments) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, order_id, rating, comments], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback_id: results.insertId
        });
    });
};


//Get feedback details by using ID
exports.getFeedbackById = (req, res) => {
    const { feedback_id } = req.params;

    const query = 'SELECT * FROM feedback WHERE feedback_id = ?';
    db.query(query, [feedback_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'feedback not found' });
        }

        res.status(200).json(results[0]);
    });
};


//Update feedback
exports.updateFeedback = (req, res) => {
    const { feedback_id } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(feedback_id);
  
    const query = `UPDATE feedback SET ${fields} WHERE feedback_id = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
  
      res.status(200).json({ message: 'Feedback updated successfully' });
    });
  };


  //Get all feedback
  exports.getAllFeedback = (req, res) => {
    const query = 'SELECT * FROM feedback';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ feedback: results });
    });
};


//DELETE feedback
exports.deleteFeedback = (req, res) => {
    const { feedback_id } = req.params;

    const query = 'DELETE FROM feedback WHERE feedback_id = ?';
    db.query(query, [feedback_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    });
};


