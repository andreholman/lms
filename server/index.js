require("dotenv").config({ path: __dirname + "/.env" })

const express = require("express");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json({type: "*/json"});

const PORT = process.env.PORT || 9000;

// middleware
app.use((req, res, next) => {
	console.log(`${req.ip} | ${req.method} ${req.url}`);
	next();
});
function checkRequestBody(req, res, next) {
	if (!req.body) {
		return res.status(400).json({ error: "Request body is missing or empty" });
	}
	next();
}

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.route("/branches")
	.get(async (req, res) => { // list branches
		const branches = await prisma.branch.findMany()
		res.status(200).json(branches);
	})
	.post(jsonParser, checkRequestBody, async (req, res) => {
		
		const { name, address, contact_number } = req.body;

		if (!name || !address || !contact_number) {
			return res.status(400).json({ error: "Required field(s) missing" });
		}

		const newBranch = await prisma.branch.create({
			data: {
				name,
				address,
				contact_number
			},
		});

		res.status(201).json(newBranch);
	})
	.put(jsonParser, checkRequestBody, async (req, res) => {
		const { id, name, address, contact_number } = req.body;

		const updatedBranch = await prisma.branch.update({
			where: { id },
			data: {
				name,
				address,
				contact_number
			},
		});
		res.status(200).json(updatedBranch);
	})
	.delete(jsonParser, checkRequestBody, async (req, res) => {
		const { id } = req.body;
		if (!id) {
			return res.status(400).json({ error: "Required field(s) missing" });
		}

		await prisma.branch.delete({
			where: { id },
		});
		res.status(204).end();
	});

app.listen(PORT, () => {
	console.log(`Server listening on the port ${PORT}`);
})