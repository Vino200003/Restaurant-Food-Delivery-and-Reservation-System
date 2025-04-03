const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); 

router.post('/feedback', feedbackController.createFeedback);
router.get('/feedback/:feedback_id', feedbackController.getFeedbackById);
router.put('/feedback/:feedback_id', feedbackController.updateFeedback);
router.get('/feedback', feedbackController.getAllFeedback);
router.delete('/feedback/:feedback_id', feedbackController.deleteFeedback);


module.exports = router;