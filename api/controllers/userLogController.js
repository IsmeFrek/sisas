const UserLog = require('../models/userLog');

// Get all user logs
exports.getUserLogs = async (req, res) => {
	try {
		const logs = await UserLog.find().populate('userId', 'username email');
		res.json(logs);
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};

// Get a single user log by ID
exports.getUserLog = async (req, res) => {
	try {
		const log = await UserLog.findById(req.params.id).populate('userId', 'username email');
		if (!log) return res.status(404).json({ message: 'User log not found' });
		res.json(log);
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};

// Create a new user log
exports.createUserLog = async (req, res) => {
	try {
		const log = await UserLog.create(req.body);
		res.status(201).json(log);
	} catch (err) {
		res.status(400).json({ message: 'Error creating user log', error: err.message });
	}
};

// Delete a user log
exports.deleteUserLog = async (req, res) => {
	try {
		await UserLog.findByIdAndDelete(req.params.id);
		res.json({ message: 'User log deleted' });
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};
