const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reservations', reservationController.createReservation);
router.get('/reservations/:reserve_id', reservationController.getReservationById);
router.put('/reservations/:reserve_id', reservationController.updateReservationDetails);
router.delete('/reservations/:reserve_id', reservationController.deleteReservation);

module.exports = router;