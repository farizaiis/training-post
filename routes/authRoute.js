//belom selesai

const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

router.post("/login", auth.login) //create data admins
router.post("/register", auth.register) //create data admins

module.exports = router