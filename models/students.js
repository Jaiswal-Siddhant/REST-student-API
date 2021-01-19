const mongoose = require('mongoose');
const validator = require('validator');

// Creating student schema in mongoose
const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
	},
	email: {
		type: String,
		required: true,
		unique: [true, 'Already present'],
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid Error');
			}
		},
	},
	phone: {
		type: Number,
		minlength: 10,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
});

// Creating new Collection using model
const Student = new mongoose.model('Student', studentSchema);

// Exporting Student schema
module.exports = Student;