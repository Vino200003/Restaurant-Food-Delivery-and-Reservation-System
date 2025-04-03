const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.post('/orders/:order_id/items', orderItemController.addItemsInOrder);
router.get('/orders/:order_id/items', orderItemController.getItemsInOrder);
router.put('/orders/:order_id/items/:order_item_id', orderItemController.updateItemInOrder);
router.delete('/orders/:order_id/items/:order_item_id', orderItemController.deleteItemInOrder);
router.delete('/orders/:order_id/items', orderItemController.deleteAllItemsInOrder);




module.exports = router;