const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { route } = require('express/lib/application');

router.post('/orders', orderController.createOrder);
router.get('/orders/:order_id', orderController.getOrderById);
router.put('/orders/:order_id', orderController.updateOrderStatus);
router.get('/orders/users/:user_id', orderController.getOrdersByUser);
router.get('/orders', orderController.getAllOrders);
router.delete('/orders/:order_id', orderController.deleteOrder);

module.exports = router;