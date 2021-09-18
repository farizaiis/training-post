const express = require('express')
const router = express.Router()
const scores = require('../controllers/scoresController')

router.post("/", scores.postScores) //create data scores
router.get("/:id", scores.getOneScores) //get 1 data scores by id
router.get("/", scores.getAllScores) //get all data scores
router.put("/:id", scores.updateScores) //update data scores by id
router.delete("/:id", scores.deleteOneScores) //delete data scores by id

module.exports = router