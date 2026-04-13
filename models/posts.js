const z = require("zod")

const createPostSchema = z.object({
	title: z.string().min(3),
	body: z.string().min(3),
	author: z.string(),
	createdAt: z.number()
})

const createReplySchema = z.object({
	body: z.string().min(3),
	author: z.string(),
	createdAt: z.number()
})

class PostRepository {
	constructor() {
		this.posts = [
			{
				id: 1,
				title: "Welcome to the BBS",
				body: "This is our first post.",
				author: "Admin",
				createdAt: 1776108821302,
				replies: [
					{
						id: 1,
						body: "Glad to be here!",
						author: "Bob",
						createdAt: 1776108891302
					}
				]
			}
		]
	}

	_generateNextPostId() {
		return Math.max(this.posts.map(post => post.id)) + 1
	}

	_generateNextReplyId() {
		return Math.max(this.posts.flatMap(post => post.replies.map(reply => reply.id))) + 1
	}

	getAll() {
		return this.posts.map((post) => ({
			...post,
			replies: undefined
		}))
	}

	getById(id) {
		return this.posts.find((post) => post.id == id) ?? null
	}

	create(data) {
		const validatedData = createPostSchema.parse(data)
		const newPost = {
			...validatedData,
			id: this._generateNextPostId(),
			replies: []
		}
		this.posts.push(newPost)
		return newPost
	}

	createReply(postId, data) {
		const post = this.getById(postId)
		if (post === null) {
			//TODO: create a special not found error type so controller can response with 404
			throw new Error("Post not found!")
		}

		const validatedData = createReplySchema.parse(data)
		const newReply = {
			...validatedData,
			id: this._generateNextReplyId()
		}

		post.replies.push(newReply)

		return newReply
	}

	deleteById(postId) {
		const post = this.getById(postId)
		if (post === null) {
			//TODO: create a special not found error type so controller can response with 404
			throw new Error("Post not found!")
		}
		this.posts = this.posts.filter((post) => post.id !== postId)
		return post
	}
}

module.exports = {
	PostRepository: new PostRepository()
}