const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/supplier', supplierController.createSuppliers);
router.get('/supplier/:supplier_id', supplierController.getSupplierById);
router.put('/supplier/:supplier_id', supplierController.updateSupplierDetails);
router.get('/supplier', supplierController.getAllSupplier);
router.delete('/supplier/:supplier_id', supplierController.deleteSupplier);

module.exports = router;