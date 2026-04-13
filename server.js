const express = require("express")
const cors = require("cors")
const postRouter = require("./routes/posts")

const app = express()

app.use(cors('*'))
app.use(express.json())

app.use("/api/posts", postRouter)

app.listen(3000, (err) => {
	if (err) {
		console.error(err)
	} else {
		console.log("listening at http://localhost:3000")
	}
})