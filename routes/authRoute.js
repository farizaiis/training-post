const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

router.post("/login", auth.login) //create data admins
router.post("/register", auth.register) //login admin

module.exports = router