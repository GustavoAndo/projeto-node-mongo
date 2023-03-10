const router = require("express").Router()

const serviceController = require("../controllers/serviceController")

router.route("/").post((req, res) => serviceController.create(req, res))
router.route("/").get((req, res) => serviceController.getAll(req, res))

module.exports = router