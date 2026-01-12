const express = require('express');
const {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getStudentCount
}= require('../controllers/studentController');
// const { Component } = require('@angular/core');
const router = express.Router();

router.post('/students', createStudent);
router.get('/students', getStudents);
router.get('/students/count', getStudentCount);
router.get('/students/:id', getStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
module.exports = router;
