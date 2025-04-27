const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Remove /reservations prefix since routes are mounted under /api/reservations
router.post('/', reservationController.createReservation); // Changed from /reservations to /
router.get('/:reserve_id', reservationController.getReservationById); // Changed from /reservations/:reserve_id to /:reserve_id
router.put('/:reserve_id', reservationController.updateReservationDetails); // Changed from /reservations/:reserve_id to /:reserve_id
router.delete('/:reserve_id', reservationController.deleteReservation); // Changed from /reservations/:reserve_id to /:reserve_id

module.exports = router;