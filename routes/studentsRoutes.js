const express = require('express')
const router = express.Router()
const students = require('../controllers/studentsController')

router.post("/", students.postStudents) //create data students
router.get("/:id", students.getOneStudents) //get 1 data students by id
router.get("/", students.getAllStudents) //get all data students
router.put("/:id", students.updateStudents) //update data students by id
router.delete("/:id", students.deleteOneStudents) //delete data students by id

module.exports = router