const express = require("express");
const { marksModel } = require("../model/marksSchema");
const marksRouter = express.Router();

// Get all marks
marksRouter.get("/marks", async (req, res) => {
    try {
        const marksData = await marksModel.find().populate('student', 'name').populate('subject', 'name');
        return res.status(200).send({ error: false, items: marksData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

// Add a new mark
marksRouter.post("/add", async (req, res) => {
    const { student, stream, subject, marks } = req.body;

    try {
        if (!student || !stream || !subject || !marks) {
            return res.status(400).send({ error: true, message: "All mark details are required" });
        }

        const newMark = new marksModel({ student, stream, subject, marks });
        await newMark.save();

        return res.status(201).send({ error: false, items: newMark });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: true, message: "Failed to add mark" });
    }
});

// Update a mark by ID
marksRouter.patch("/update/:id", async (req, res) => {
    const { student, stream, subject, marks } = req.body;
    const { id } = req.params;

    try {
        const updatedMark = await marksModel.findByIdAndUpdate(id, { student, stream, subject, marks }, { new: true });
        return res.status(201).send({ error: false, items: updatedMark });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

// Delete a mark by ID
marksRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMark = await marksModel.findByIdAndDelete(id);
        return res.status(201).send({ error: false, items: deletedMark });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

module.exports = { marksRouter };
