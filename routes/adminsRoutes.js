const express = require('express')
const router = express.Router()
const admins = require('../controllers/adminsController')
const auth = require('../middlewares/auth')

router.get("/:id", auth, admins.getOneAdmins) //get 1 data admins by id
router.get("/", auth, admins.getAllAdmins) //get all data admins
router.put("/:id", auth, admins.updateAdmins) //update data admins by id
router.delete("/:id", auth, admins.deleteOneAdmins) //delete data admins by id

module.exports = router