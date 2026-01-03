const express = require('express');
const router = express.Router();
const rollUserController = require('../controllers/rollUserController');

// GET /api/roles - get all created roles from DB
router.get('/roles', rollUserController.getAllCreatedRoles);


// POST /api/roles - create a new role
router.post('/roles', rollUserController.createRole);

// POST /api/assign-role - assign a role to a user
router.post('/assign-role', rollUserController.assignRole);

module.exports = router;
