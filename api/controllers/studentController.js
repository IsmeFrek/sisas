// Get total student count
exports.getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    console.log('Incoming student data:', req.body); // Log incoming data
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    // Duplicate key error handling
    if (error.code === 11000) {
      const fields = Object.keys(error.keyValue);
      let message = 'Duplicate value for: ' + fields.join(', ');
      if (fields.includes('gmail')) message = 'Gmail already exists.';
      if (fields.includes('phone')) message = 'Phone already exists.';
      return res.status(409).json({ error: message });
    }
    // Log validation errors for debugging
    if (error.errors) {
      console.error('Validation errors:', error.errors);
      return res.status(400).json({ error: error.message, details: error.errors });
    }
    res.status(400).json({ error: error.message });
  }

};
exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};  
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateStudent = async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
}
exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
}