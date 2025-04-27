const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Update routes to match the orders table structure in your database
router.post('/', orderController.createOrder);
router.get('/user/:user_id', orderController.getOrdersByUser);
router.get('/:order_id', orderController.getOrderById);
router.put('/:order_id', orderController.updateOrderStatus);
router.get('/', orderController.getAllOrders);
router.delete('/:order_id', orderController.deleteOrder);

module.exports = router;