const router = require("express").Router()

const servicesRouter = require("./services")

router.use("/service", servicesRouter)

module.exports = router;