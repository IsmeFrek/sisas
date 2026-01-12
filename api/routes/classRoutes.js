const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Create a new class
router.post('/class', classController.createClass);

// Get all classes
router.get('/class', classController.getClasses);

// Update a class
router.put('/class/:id', classController.updateClass);

// Delete a class
router.delete('/class/:id', classController.deleteClass);

module.exports = router;
