const express = require('express');

// creating schema object
const Student = require('./models/students');

// connecting to mongo
require('./db/conn');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// To save Student info
app.post('/students', async (req, res) => {
	try {
		const stud = new Student(req.body);
		const createStud = await stud.save();
		res.status(201).send(createStud);
	} catch (e) {
		console.log(e);
	}
});

// To get all students in DB
app.get('/students', async (_req, res) => {
	try {
		const result = await Student.find();
		res.status(200).send(result);
	} catch (e) {
		res.status(404).send();
		console.log(e);
	}
});

// To get specific student
app.get('/student/:key', async (req, res) => {
	try {
		const key = req.query;
		const result = await Student.find(key);
		console.log(result);
		if (result.length != 0) {
			res.status(200).send(result);
		} else {
			res.status(404).send('Not Found!');
			console.log('404');
		}
	} catch (error) {
		res.status(404).send();
		console.log(error);
	}
});

// To Update Student info
app.patch('/students/:key', async (req, res) => {
	try {
		const key = req.query;
		const toUpdate = req.body;
		const result = await Student.findOneAndUpdate(
			key,
			{ $set: toUpdate },
			{ useFindAndModify: false }
		);
		if (result.length != 0) {
			res.status(200).send(result);
		} else {
			res.status(404).send();
		}
	} catch (e) {
		res.status(404).send();
		console.log(e);
	}
});

// To Delete Student Info
app.delete('/students', async (req, res) => {
	try {
		const toDelete = req.body;
		const result = await Student.deleteOne(toDelete);
		if (result.length != 0) {
			res.status(200).send(result);
		} else {
			res.status(404).send();
		}
	} catch (e) {
		res.status(404).send();
		console.log(e);
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}....`);
});
