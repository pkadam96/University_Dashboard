const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    name : {type : String, required : true},
},{
    versionKey: false
})

const streamModel = mongoose.model("streams",streamSchema);

module.exports = {streamModel}