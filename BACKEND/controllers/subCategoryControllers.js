const db = require('../config/db');

// Add a new sub category
exports.createSubCategory = (req, res) => {
    const { subcategory_name, category_code } = req.body;

    // Validate required fields
    if (!subcategory_name || !category_code) {
        return res.status(400).json({ message: 'Subcategory name and category code are required' });
    }

    const query = 'INSERT INTO subcategories (subcategory_name, category_code) VALUES (?, ?)';
    db.query(query, [subcategory_name, category_code], (err, results) => {
        if (err) {
            console.error('Error creating subcategory:', err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: 'Invalid category code' });
            }
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Subcategory created successfully',
            subcategory_code: results.insertId
        });
    });
};




// Get all subcategories
exports.getAllSubCategories = (req, res) => {
    const query = `
        SELECT s.*, c.category_name 
        FROM subcategories s
        JOIN categories c ON s.category_code = c.category_code
        ORDER BY s.subcategory_name
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching subcategories:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        
        res.status(200).json({ subcategories: results });
    });
};

// Get subcategory by code
exports.getSubCategoryByCode = (req, res) => {
    const subcategory_code = req.params.id;
    
    const query = `
        SELECT s.*, c.category_name 
        FROM subcategories s
        JOIN categories c ON s.category_code = c.category_code
        WHERE s.subcategory_code = ?
    `;
    
    db.query(query, [subcategory_code], (err, results) => {
        if (err) {
            console.error('Error fetching subcategory:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        
        res.status(200).json({ subcategory: results[0] });
    });
};

// Get subcategories by category code
exports.getSubCategoriesByCategory = (req, res) => {
    const category_code = req.params.categoryId;
    
    const query = 'SELECT * FROM subcategories WHERE category_code = ? ORDER BY subcategory_name';
    
    db.query(query, [category_code], (err, results) => {
        if (err) {
            console.error('Error fetching subcategories by category:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        
        res.status(200).json({ subcategories: results });
    });
};

// Update subcategory
exports.updateSubCategory = (req, res) => {
    const subcategory_code = req.params.id;
    const { subcategory_name, category_code } = req.body;
    
    // Validate required fields
    if (!subcategory_name || !category_code) {
        return res.status(400).json({ message: 'Subcategory name and category code are required' });
    }
    
    const query = 'UPDATE subcategories SET subcategory_name = ?, category_code = ? WHERE subcategory_code = ?';
    
    db.query(query, [subcategory_name, category_code, subcategory_code], (err, results) => {
        if (err) {
            console.error('Error updating subcategory:', err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: 'Invalid category code' });
            }
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        
        res.status(200).json({ message: 'Subcategory updated successfully' });
    });
};

// Delete subcategory
exports.deleteSubCategory = (req, res) => {
    const subcategory_code = req.params.id;
    
    // First check if subcategory is referenced in any products
    const checkQuery = 'SELECT COUNT(*) AS count FROM products WHERE subcategory_code = ?';
    
    db.query(checkQuery, [subcategory_code], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking subcategory references:', checkErr);
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (checkResults[0].count > 0) {
            return res.status(400).json({ 
                message: 'Cannot delete subcategory because it is associated with products' 
            });
        }
        
        // If no references, proceed with deletion
        const deleteQuery = 'DELETE FROM subcategories WHERE subcategory_code = ?';
        
        db.query(deleteQuery, [subcategory_code], (err, results) => {
            if (err) {
                console.error('Error deleting subcategory:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
            
            res.status(200).json({ message: 'Subcategory deleted successfully' });
        });
    });
};