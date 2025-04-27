const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

// Route paths should not include /users since they're mounted under /api/users in app.js
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser); // Changed from /users/login to /login
router.get('/:user_id', authenticateToken, userController.getUserProfile); // Changed from /users/:user_id to /:user_id
router.put('/:user_id', authenticateToken, userController.updateuserProfile); // Changed from /users/:user_id to /:user_id
//router.get('/getAllusers', userController.getAllUsers )

module.exports = router;