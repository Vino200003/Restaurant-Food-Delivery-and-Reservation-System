const db = require('../config/db');

// ADD a new table
exports.createTable = (req, res) => {
    const { capacity } = req.body;

    const query = 'INSERT INTO Tables (capacity) VALUES (?)';
    db.query(query, [capacity], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Table created successfully',
            table_no: results.insertId
        });
    });
};


//GET a table by table_no
exports.getTableByNo = (req, res) => {
    const { table_no } = req.params;

    const query = 'SELECT * FROM Tables WHERE table_no = ?';
    db.query(query, [table_no], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Table not found' });
        }

        res.status(200).json(results[0]);
    });
};

//Update table details
exports.updateTableDetails = (req, res) => {
    const { table_no } = req.params;
    const updates = req.body;
  
    // Build the query dynamically
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(table_no);
  
    const query = `UPDATE Tables SET ${fields} WHERE table_no = ?`;
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Table not found' });
      }
  
      res.status(200).json({ message: 'Table profile updated successfully' });
    });
  };


  //GET all tables
  exports.getAllTables = (req, res) => {
    const query = 'SELECT * FROM Tables';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ Tables: results });
    });
};


//DETELE table
exports.deleteTable = (req, res) => {
    const { table_no } = req.params;

    const query = 'DELETE FROM Tables WHERE table_no = ?';
    db.query(query, [table_no], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json({ message: 'Table deleted successfully' });
    });
};
