const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., 'login', 'logout', 'update', etc.
  timestamp: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 }, // auto-delete after 7 days
  details: { type: String },
  ip: { type: String },
  city: { type: String }
});

module.exports = mongoose.model('UserLog', userLogSchema);
