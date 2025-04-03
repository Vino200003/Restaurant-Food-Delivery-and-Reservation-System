const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/users/:user_id', authenticateToken, userController.getUserProfile);
router.put('/users/:user_id', authenticateToken, userController.updateuserProfile);
//router.get('/users/getAllusers', userController.getAllUsers )

module.exports = router;