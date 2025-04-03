const { query } = require('express');
const db = require('../config/db');

// Create a new category
exports.createCategory = (req, res) => {
    const {  category_name } = req.body;

    const query = 'INSERT INTO Categories ( category_name) VALUES ( ?)';
    db.query(query, [ category_name], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Category created successfully',
            category_code: results.insertId
        });
    });
};


// GET All category
exports.getAllCategory = (req, res) => {
    const query = 'SELECT * FROM categories';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(200).json({ category: results });
    });
};

