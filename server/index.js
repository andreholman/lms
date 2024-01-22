require("dotenv").config({path: __dirname + "/.env"})

const express = require("express");
const pool = require(__dirname + "/config/db.config.js");

const app = express();

const PORT = process.env.PORT || 9000;

app.use((req, res, next) => { // middleware
	console.log(`${req.ip} | ${req.method} ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/branches", (req, res) => {
	pool.query("SELECT * FROM branches", (error, branches) => {
		if (error) {
			throw error;
		}
		res.status(200).json(branches.rows);
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on the port ${PORT}`);
})