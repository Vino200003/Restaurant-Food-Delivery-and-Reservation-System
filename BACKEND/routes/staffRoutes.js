const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController'); 

// Remove /staff prefix since routes are mounted under /api/staff
router.post('/', staffController.createStaff); // Changed from /staff to /
router.get('/:staff_id', staffController.getStaffById); // Changed from /staff/:staff_id to /:staff_id
router.put('/:staff_id', staffController.updateStaffDetails); // Changed from /staff/:staff_id to /:staff_id
router.get('/', staffController.getAllStaff); // Changed from /staff to /
router.delete('/:staff_id', staffController.deleteStaff); // Changed from /staff/:staff_id to /:staff_id

module.exports = router;