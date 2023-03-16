const router = require("express").Router()
const { upload } = require("../config/gridFsConfig")

const partyController = require("../controllers/partyController")

router.route("/").post(upload.array('file'), (req, res) => partyController.create(req, res))

router.route("/").get((req, res) => partyController.getAll(req, res))

router.route("/:id").get((req, res) => partyController.get(req, res))

router.route("/:id").delete((req, res) => partyController.delete(req, res))

router.route("/:id").patch((req, res) => partyController.update(req, res))

router.route("/download/:id").get((req, res) => partyController.download(req, res))

router.route("/:id/:idFile").delete((req, res) => partyController.removeFile(req, res))

module.exports = router