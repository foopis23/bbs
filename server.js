const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors('*'))
app.use(express.json())

app.get("/", (req, res) => {
	res.json({
		hello: "world"
	})
})

app.listen(3000, (err) => {
	if (err) {
		console.error(err)
	} else {
		console.log("listening at http://localhost:3000")
	}
})