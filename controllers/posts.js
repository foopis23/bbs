const { PostRepository } = require("../models/posts")

class PostController {
	constructor(model) {
		this.model = model
	}

	getAll(req, res) {
		const posts = this.model.getAll()
			.sort((a, b) => b.createdAt - a.createdAt)
		res.status(200).json(posts)
	}

	getById(req, res) {
		const id = Number(req.params.id);
		const post = this.model.getById(id)
		const status = post === null ? 404 : 200;
		if (post) {
			post.replies = post.replies.sort((a, b) => b.createdAt - a.createdAt)
		}
		return res.status(status).json(post)
	}

	create(req, res) {
		console.log(req)
		const data = req.body
		const newPost = this.model.create(data)
		return res.status(201).json(newPost)
	}

	createReply(req, res) {
		const postId = Number(req.params.id)
		const data = req.body
		const newReply = this.model.createReply(postId, data)
		return res.status(201).json(newReply)
	}

	deleteById(req, res) {
		const postId = Number(req.params.id)
		const deletedPost = this.model.deleteById(postId)
		return res.status(200).json(deletedPost)
	}
}

module.exports = {
	PostController: new PostController(PostRepository)
}