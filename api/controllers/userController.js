
const path = require('path');
const multer = require('multer');
const fs = require('fs');
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
        if (req.file) {
            userData.profileImage = 'upload/' + req.file.filename;
        }
        const user = await User.create(userData);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
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
        // Only update password if provided
        if (!updateData.password) {
            delete updateData.password;
        }
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
};