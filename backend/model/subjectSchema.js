const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'streams', required: true } 
}, {
    versionKey: false
});

const subjectModel = mongoose.model("subjects", subjectSchema);

module.exports = {subjectModel};
