const User = require('../models/User');

// POST /api/login
exports.login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'Username and password are required.' });
	}
	try {
		// Find user by username or email
		const user = await User.findOne({
			$or: [
				{ username },
				{ email: username }
			]
		});
		if (!user) {
			return res.status(401).json({ message: 'Invalid username or password.' });
		}
		// Check password (assuming plain text for now, use hashing in production)
		if (user.password !== password) {
			return res.status(401).json({ message: 'Invalid username or password.' });
		}
				// Log user login with IP and city
				const UserLog = require('../models/userLog');
				const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
				// For demo, city is a placeholder. Use geoip lookup for real city detection.
				await UserLog.create({
					userId: user._id,
					action: 'login',
					ip,
					city: 'Unknown', // Replace with geoip lookup if needed
					details: 'User logged in'
				});

				// Login successful, return a token (for demo, just a string)
				res.json({
					message: 'Login successful',
					token: 'demo_token',
					user: {
						id: user._id,
						username: user.username,
						email: user.email,
						profileImage: user.profileImage || ''
					}
				});
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};
