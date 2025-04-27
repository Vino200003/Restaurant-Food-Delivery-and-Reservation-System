const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Remove /category prefix since routes are mounted under /api/categories in app.js
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategory);

module.exports = router;