const router = require("express").Router()

const partyController = require("../controllers/partyController")

router.route("/").post((req, res) => partyController.create(req, res))
router.route("/").get((req, res) => partyController.getAll(req, res))
router.route("/:id").get((req, res) => partyController.get(req, res))

module.exports = router