const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true }, 
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'streams', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects', required: true }, 
    marks: { type: Number, required: true }
}, {
    versionKey: false
});

const marksModel = mongoose.model("marks", marksSchema);

module.exports = {marksModel};
