import * as z from 'zod';

const postIdSchema = z.number()
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

async function fetchJson(...args) {
	console.log("FETCH ARGS", args)
	const response = await fetch(...args)
	if (!response.ok) {
		throw new Error(`HTTP Error Occurred\n${response.status}: ${args[0]}`)
	}
	return await response.json()
}

export async function getAllPosts() {
	return await fetchJson(`${import.meta.env.VITE_BBS_URL}/posts`)
}

export async function getPostById(id) {
	postIdSchema.parse(id)
	return await fetchJson(`${import.meta.env.VITE_BBS_URL}/posts/${id}`)
}

export async function createPost(data) {
	if (data.createdAt == undefined) {
		data.createdAt = Date.now()
	}
	const validatedData = createPostSchema.parse(data)
	return await fetchJson(`${import.meta.env.VITE_BBS_URL}/posts`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(validatedData)
	})
}

export async function createReply(postId, data) {
	if (data.createdAt == undefined) {
		data.createdAt = Date.now()
	}
	postIdSchema.parse(postId)
	const validateData = createReplySchema.parse(data)
	return await fetchJson(`${import.meta.env.VITE_BBS_URL}/posts/${postId}/replies`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(validateData)
	})
}

export async function deletePostById(id) {
	postIdSchema.parse(id)
	return await fetchJson(`${import.meta.env.VITE_BBS_URL}/posts/${id}`, {
		method: "DELETE"
	})
}