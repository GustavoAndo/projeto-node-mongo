const router = require("express").Router()
const checkToken = require("../middlewares/authMiddleware")

const servicesRouter = require("./services")
router.use("/service", servicesRouter)

const partiesRouter = require("./parties")
router.use("/party", checkToken, partiesRouter)

const usersRouter = require("./users")
router.use("/user", usersRouter)

module.exports = router;