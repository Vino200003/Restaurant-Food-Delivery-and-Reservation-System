const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController'); 

router.post('/staff', staffController.createStaff);
router.get('/staff/:staff_id', staffController.getStaffById);
router.put('/staff/:staff_id', staffController.updateStaffDetails);
router.get('/staff', staffController.getAllStaff);
router.delete('/staff/:staff_id', staffController.deleteStaff);

module.exports = router;