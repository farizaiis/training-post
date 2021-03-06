const express = require('express')
const router = express.Router()
const scores = require('../controllers/scoresController')
const auth = require('../middlewares/auth')

router.post("/:idStudents", auth, scores.postScores) //create data scores
router.get("/:idStudents", auth, scores.getOneScores) //get 1 data scores by id
router.get("/", auth, scores.getAllScores) //get all data scores
router.put("/:idStudents", auth, scores.updateScores) //update data scores by id
router.delete("/:idStudents", auth, scores.deleteOneScores) //delete data scores by id

module.exports = router