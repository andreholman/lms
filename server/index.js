require("dotenv").config({ path: __dirname + "/.env" })

const express = require("express");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json({type: "*/json"});

const PORT = process.env.PORT || 9000;

BigInt.prototype.toPhoneNumber = function() {
	const phoneString = this.toString();
	const areaCode = phoneString.substring(0, 3);
	const firstPart = phoneString.substring(3, 6);
	const secondPart = phoneString.substring(6, 10);
	
	return `(${areaCode}) ${firstPart}-${secondPart}`;
}
function serializeBigInts(objects) { // parses the BigInt in object(s) that contain a contact_number
	if (Array.isArray(objects)) {
		return objects.map(
			(obj) => ({
				...obj,
				contact_number: obj.contact_number.toPhoneNumber(),
			})
		);
	} else { // only one to parse
		return {
			...objects,
			contact_number: objects.contact_number.toPhoneNumber(),
		}
	}
}

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
		res.status(200).json(serializeBigInts(branches));
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

		res.status(201).json(serializeBigInts(newBranch));
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
		res.status(200).json(serializeBigInts(updatedBranch));
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