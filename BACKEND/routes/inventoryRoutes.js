const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController'); // Ensure this path is correct

router.post('/inventory', inventoryController.createInventory);
router.get('/inventory/:inventory_id', inventoryController.getInventoryById);
router.put('/inventory/:inventory_id', inventoryController.updateInventoryDetails);
router.get('/inventory', inventoryController.getAllInventory);
router.delete('/inventory/:inventory_id', inventoryController.deleteInventory);

module.exports = router;