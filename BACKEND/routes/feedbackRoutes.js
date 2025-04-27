const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); 

// Routes for feedback functionality
router.post('/', feedbackController.createFeedback);
router.get('/:feedback_id', feedbackController.getFeedbackById);
router.put('/:feedback_id', feedbackController.updateFeedback);
router.get('/', feedbackController.getAllFeedback);
router.delete('/:feedback_id', feedbackController.deleteFeedback);

module.exports = router;