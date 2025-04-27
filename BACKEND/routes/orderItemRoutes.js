const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Update routes to match the order_items table structure in your database
// Since this is now mounted at /api/orders, these paths should focus on order items
router.post('/:order_id/items', orderItemController.addItemsInOrder);
router.get('/:order_id/items', orderItemController.getItemsInOrder);
router.put('/:order_id/items/:order_item_id', orderItemController.updateItemInOrder);
router.delete('/:order_id/items/:order_item_id', orderItemController.deleteItemInOrder);
router.delete('/:order_id/items', orderItemController.deleteAllItemsInOrder);

module.exports = router;