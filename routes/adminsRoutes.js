const express = require('express')
const router = express.Router()
const admins = require('../controllers/adminsController')

router.post("/", admins.postAdmins) //create data admins
router.get("/:id", admins.getOneAdmins) //get 1 data admins by id
router.get("/", admins.getAllAdmins) //get all data admins
router.put("/:id", admins.updateAdmins) //update data admins by id
router.delete("/:id", admins.deleteOneAdmins) //delete data admins by id

module.exports = router