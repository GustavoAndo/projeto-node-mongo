const router = require("express").Router()

const userController = require("../controllers/userController")

router.route("/").post((req, res) => userController.create(req, res))

router.route("/").get((req, res) => userController.getAll(req, res))

router.route("/:id").get((req, res) => userController.get(req, res))

router.route("/:id").delete((req, res) => userController.delete(req, res))

router.route("/:id").patch((req, res) => userController.update(req, res))

router.route("/password/:id").patch((req, res) => userController.updatePassword(req, res))

module.exports = router