const express = require("express");
const { subjectModel } = require("../model/subjectSchema");
const subjectRouter = express.Router();

subjectRouter.get("/subjects", async (req, res) => {
    try {
        const subjectsData = await subjectModel.find();
        return res.status(200).send({ error: false, items: subjectsData })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error })
    }
})

subjectRouter.post("/add", async (req, res) => {
    const { name, stream } = req.body;

    try {
        if (!name || !stream) {
            return res.status(400).send({ error: true, message: "Subject name and stream are required" });
        }
        const newSubject = new subjectModel({ name, stream });
        await newSubject.save();
        return res.status(201).send({ error: false, items: newSubject });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: true, message: "Failed to add subject" });
    }
});


subjectRouter.patch("/update/:id", async (req, res) => {
    const { name, stream } = req.body;
    const { id } = req.params;

    if (!name || !stream) {
        return res.status(400).send({ error: true, message: "Name and stream are required" })
    }

    try {
        const updatedsubject = await subjectModel.findByIdAndUpdate(id, { name, stream }, { new: true });
        return res.status(201).send({ error: false, items: updatedsubject })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

subjectRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletesubject = await subjectModel.findByIdAndDelete(id);
        return res.status(201).send({ error: false, items: deletesubject })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

module.exports={subjectRouter}