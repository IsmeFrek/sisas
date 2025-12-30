const User = require("../models/User")

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
}