const router = require("express").Router()
const movieController = require("../../controllers/movieController")
router.route("/movies/:moviename")
    .get(movieController.getMovie)

module.exports = router