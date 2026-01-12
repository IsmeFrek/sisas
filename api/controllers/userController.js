const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const User = require("../models/User");

// Multer config for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../upload'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.fieldname + '-' + Date.now() + ext;
        cb(null, name);
    }
});
exports.upload = multer({ storage });

exports.createUser = async (req, res) => {
    try {
        let userData = req.body;
        
        // Validate required fields
        if (!userData.username || !userData.password || !userData.email) {
            return res.status(400).json({ error: 'Username, password, and email are required' });
        }

        // Validate password strength
        if (userData.password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }
        if (!/[A-Z]/.test(userData.password)) {
            return res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
        }
        if (!/[0-9]/.test(userData.password)) {
            return res.status(400).json({ error: 'Password must contain at least one number' });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)) {
            return res.status(400).json({ error: 'Password must contain at least one special character' });
        }

        // Hash password before storing
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        if (req.file) {
            userData.profileImage = 'upload/' + req.file.filename;
        }
        
        const user = await User.create(userData);
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ error: `${field} already exists` });
        }
        console.error('Create user error:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        let updateData = req.body;
        if (req.file) {
            updateData.profileImage = 'upload/' + req.file.filename;
        }
        
        // Hash password if it's being updated
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        } else {
            delete updateData.password;
        }
        
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.json(userResponse);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ error: `${field} already exists` });
        }
        console.error('Update user error:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
