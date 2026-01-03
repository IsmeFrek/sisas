const mongoose = require('mongoose');

const rollUserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	role: {
		type: String,
		enum: ['Admin', 'User', 'Instructor'],
		required: true
	}
});

module.exports = mongoose.model('RollUser', rollUserSchema);
