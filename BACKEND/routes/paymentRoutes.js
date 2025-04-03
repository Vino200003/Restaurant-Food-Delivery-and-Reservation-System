const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


router.post('/payments', paymentController.addPaymentEntry);
router.get('/payments/:order_id', paymentController.getPaymentDetails);
router.put('/payments/:payment_id', paymentController.updatePaymentStatus);
router.get('/payments', paymentController.getAllPaymentDetails)

module.exports = router;