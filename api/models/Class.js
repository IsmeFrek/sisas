const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  promotion: String,
  year: Number
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;