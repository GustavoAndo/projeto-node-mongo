const router = require("express").Router()
const {checkToken, checkManager, checkAdmin} = require("../middlewares/authMiddleware")

const userController = require("../controllers/userController")
router.route("/login").post((req, res) => userController.login(req, res))

const servicesRouter = require("./services")
router.use("/service", checkToken, servicesRouter)

const partiesRouter = require("./parties")
router.use("/party", checkToken, checkManager, partiesRouter)

const usersRouter = require("./users")
router.use("/user", checkToken, checkAdmin, usersRouter)

module.exports = router;