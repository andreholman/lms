require("dotenv").config({path: __dirname + "/.env"})

const express = require("express");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const app = express();

const PORT = process.env.PORT || 9000;

app.use((req, res, next) => { // middleware
	console.log(`${req.ip} | ${req.method} ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/branches", async (req, res) => {
	const branches = await prisma.branch.findMany()
	res.status(200).json(branches);
});


app.listen(PORT, () => {
	console.log(`Server listening on the port ${PORT}`);
})