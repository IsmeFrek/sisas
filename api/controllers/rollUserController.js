const RollUser = require('../models/rollUser');
// GET /api/roles - get all created roles from DB
exports.getAllCreatedRoles = async (req, res) => {
	try {
		const roles = await RollUser.find();
		res.json(roles);
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};
// POST /api/roles - create a new role (admin only)
exports.createRole = async (req, res) => {
	const { username, role } = req.body;
	if (!username || !role) {
		return res.status(400).json({ message: 'Username and role are required.' });
	}
	try {
		const newRole = await RollUser.create({ username, role });
		res.status(201).json(newRole);
	} catch (err) {
		res.status(400).json({ message: 'Error creating role', error: err.message });
	}
};
// Example roles
const roles = [
	{ name: 'Admin', description: 'Full access to all system features and settings.' },
	{ name: 'User', description: 'Standard user with access to main features.' },
	{ name: 'Instructor', description: 'Can manage classes, content, and student progress.' }
];

// GET /api/roles - get all roles
exports.getRoles = (req, res) => {
	res.json(roles);
};

// POST /api/assign-role - assign a role to a user
// Expects { username, role }
const User = require('../models/User');
exports.assignRole = async (req, res) => {
	const { username, role } = req.body;
	if (!username || !role) {
		return res.status(400).json({ message: 'Username and role are required.' });
	}
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}
		user.role = role;
		await user.save();
		res.json({ message: `Role '${role}' assigned to user '${username}'.` });
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};
