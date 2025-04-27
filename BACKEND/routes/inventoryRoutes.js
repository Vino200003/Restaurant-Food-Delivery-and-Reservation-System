const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController'); // Ensure this path is correct

// Remove /inventory prefix from all routes since they're mounted under /api/inventory in app.js
router.post('/', inventoryController.createInventory);
router.get('/:inventory_id', inventoryController.getInventoryById);
router.put('/:inventory_id', inventoryController.updateInventoryDetails);
router.get('/', inventoryController.getAllInventory);
router.delete('/:inventory_id', inventoryController.deleteInventory);

module.exports = router;