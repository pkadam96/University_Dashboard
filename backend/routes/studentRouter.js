const express = require("express");
const { studentModel } = require("../model/studentSchema");
const studentRouter = express.Router();

studentRouter.get("/students", async (req, res) => {
    try {
        const studentsData = await studentModel.find();
        return res.status(200).send({ error: false, items: studentsData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

studentRouter.post("/add", async (req, res) => {
    const { name, email, password, age, year, stream} = req.body;

    try {
        if (!name || !email || !password || !age || !year || !stream) {
            return res.status(400).send({ error: true, message: "All student details are required" });
        }

        const newStudent = new studentModel({ name, email, password, age, year, stream});
        await newStudent.save();

        return res.status(201).send({ error: false, items: newStudent });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: true, message: "Failed to add student" });
    }
});

studentRouter.patch("/update/:id", async (req, res) => {
    const { name, email, password, age, year, stream} = req.body;
    const { id } = req.params;

    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(id, { name, email, password, age, year, stream}, { new: true });
        return res.status(201).send({ error: false, items: updatedStudent });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

studentRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await studentModel.findByIdAndDelete(id);
        return res.status(201).send({ error: false, items: deletedStudent });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error });
    }
});

module.exports = { studentRouter };
