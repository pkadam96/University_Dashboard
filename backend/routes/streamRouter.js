const express = require("express");
const { streamModel } = require("../model/streamSchema");
const streamRouter = express.Router();


streamRouter.get("/streams", async (req, res) => {
    try {
        const streamsData = await streamModel.find();
        return res.status(200).send({ error: false, items: streamsData })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error })
    }
})

streamRouter.post("/add", async (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).send({ error: true, message: "Subject name is required" })
    }

    try {
        const newstream = new streamModel({ name });
        await newstream.save();
        return res.status(201).send({ error: false, items: newstream })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
})

streamRouter.patch("/update/:id", async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
        return res.status(400).send({ error: true, message: "Name is Required" })
    }

    try {
        const update = await streamModel.findByIdAndUpdate({ _id: id }, { name : name })
        const updatedStream = await streamModel.findById({ _id: id });
        return res.status(201).send({ error: false, items: updatedStream })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
})

streamRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deleteStream = await streamModel.findByIdAndDelete({ _id: id })
        return res.status(201).send({ error: false, items: deleteStream })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
})

module.exports={streamRouter}