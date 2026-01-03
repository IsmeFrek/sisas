
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// For multipart/form-data (image upload)
router.post('/users', userController.upload.single('profileImage'), userController.createUser);
router.put('/users/:id', userController.upload.single('profileImage'), userController.updateUser);

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;

 