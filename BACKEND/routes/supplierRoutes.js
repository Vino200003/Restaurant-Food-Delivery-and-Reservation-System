const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Remove /supplier prefix since routes are mounted under /api/suppliers in app.js
router.post('/', supplierController.createSuppliers);
router.get('/:supplier_id', supplierController.getSupplierById);
router.put('/:supplier_id', supplierController.updateSupplierDetails);
router.get('/', supplierController.getAllSupplier);
router.delete('/:supplier_id', supplierController.deleteSupplier);

module.exports = router;