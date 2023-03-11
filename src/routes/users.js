const router = require("express").Router()

const userController = require("../controllers/userController")

router.route("/").post((req, res) => userController.create(req, res))

router.route("/").get((req, res) => userController.getAll(req, res))

router.route("/login").post((req, res) => userController.login(req, res))

module.exports = router