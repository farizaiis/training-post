const express = require('express')
const router = express.Router()
const students = require('../controllers/studentsController')
const auth = require('../middlewares/auth')

router.post("/", auth, students.postStudents) //create data students
router.get("/:id", auth, students.getOneStudents) //get 1 data students by id
router.get("/", auth, students.getAllStudents) //get all data students
router.put("/:id", auth, students.updateStudents) //update data students by id
router.delete("/:id", auth, students.deleteOneStudents) //delete data students by id

module.exports = router