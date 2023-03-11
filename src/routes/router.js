const router = require("express").Router()

const servicesRouter = require("./services")
router.use("/service", servicesRouter)

const partiesRouter = require("./parties")
router.use("/party", partiesRouter)

const usersRouter = require("./users")
router.use("/user", usersRouter)

module.exports = router;