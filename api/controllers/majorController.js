const Major = require('../models/Major');

// Create a new major
exports.createMajor = async (req, res) => {
  try {
    const newMajor = new Major(req.body);
    const savedMajor = await newMajor.save();
    res.status(201).json(savedMajor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all majors
exports.getMajors = async (req, res) => {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a major
exports.updateMajor = async (req, res) => {
  try {
    const updatedMajor = await Major.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMajor) {
      return res.status(404).json({ message: 'Major not found' });
    }
    res.json(updatedMajor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a major
exports.deleteMajor = async (req, res) => {
  try {
    const deletedMajor = await Major.findByIdAndDelete(req.params.id);
    if (!deletedMajor) {
      return res.status(404).json({ message: 'Major not found' });
    }
    res.json({ message: 'Major deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
