const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Major', majorSchema);
