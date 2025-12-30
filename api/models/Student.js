const mongoose = require('mongoose');
const { aggregate } = require('./User');
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    age: { type: Number, required: true },
    class: { type: String, required: true },
    major: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    placeofbirth: { type: String, required: true },
    currentAddress: { type: String, required: true },
    grade: { type: String, required: true },
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;