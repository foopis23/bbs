const { PostController } = require("../controllers/posts")
const express = require("express")

const router = express.Router()

router.get("", PostController.getAll.bind(PostController))
router.get("/:id", PostController.getById.bind(PostController))
router.post("", PostController.create.bind(PostController))
router.post("/:id/replies", PostController.createReply.bind(PostController))
router.delete("/:id", PostController.deleteById.bind(PostController))

module.exports = router
