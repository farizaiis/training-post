const express = require('express')
const router = express.Router()
const students = require('./studentsRoutes')
const admins = require('./adminsRoutes')
const scores = require('./scoresRoute')
const auth = require('./authRoute')

router.use("/student", students)
router.use("/admin", admins)
router.use("/score", scores)
router.use("/auth", auth)
module.exports = router