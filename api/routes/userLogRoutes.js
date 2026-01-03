const express = require('express');
const router = express.Router();
const userLogController = require('../controllers/userLogController');

// Get all user logs
router.get('/user-logs', userLogController.getUserLogs);

// Get a single user log by ID
router.get('/user-logs/:id', userLogController.getUserLog);

// Create a new user log
router.post('/user-logs', userLogController.createUserLog);

// Delete a user log
router.delete('/user-logs/:id', userLogController.deleteUserLog);

module.exports = router;
