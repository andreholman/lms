require("dotenv").config();
const { Pool } = require("pg");

const database = process.env.PGDATABASE;

const pool = new Pool({
	connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}?schema=public`,
});

pool.connect((err, client, release) => { // test if it's working
	if (err) {
		return console.error('Error acquiring client', err);
	}
	console.log('Connected to the database');
});

module.exports = {
	query: (text, params) => pool.query(text, params),
	end: () => pool.end()
};