const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.addPaymentEntry);
router.get('/:order_id', paymentController.getPaymentDetails);
router.put('/:payment_id', paymentController.updatePaymentStatus);
router.get('/', paymentController.getAllPaymentDetails);

module.exports = router;