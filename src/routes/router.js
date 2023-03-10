const router = require("express").Router()

const servicesRouter = require("./services")
router.use("/service", servicesRouter)

const partiesRouter = require("./parties")
router.use("/party", partiesRouter)

module.exports = router;