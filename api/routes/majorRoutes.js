const express = require('express');
const router = express.Router();
const majorController = require('../controllers/majorController');

// Create a new major
router.post('/major', majorController.createMajor);

// Get all majors
router.get('/major', majorController.getMajors);

// Update a major
router.put('/major/:id', majorController.updateMajor);

// Delete a major
router.delete('/major/:id', majorController.deleteMajor);

module.exports = router;
