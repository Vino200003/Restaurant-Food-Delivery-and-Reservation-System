const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryControllers');

router.post('/', subCategoryController.createSubCategory);
router.get('/', subCategoryController.getAllSubCategories);
router.get('/:id', subCategoryController.getSubCategoryByCode);
router.get('/category/:categoryId', subCategoryController.getSubCategoriesByCategory);
router.put('/:id', subCategoryController.updateSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = router;