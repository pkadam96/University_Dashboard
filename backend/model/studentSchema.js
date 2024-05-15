const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    year: { type: String, required: true },
    stream: { type: String, required: true } 
}, {
    versionKey: false
});

const studentModel = mongoose.model("students", studentSchema);

module.exports = {studentModel};
