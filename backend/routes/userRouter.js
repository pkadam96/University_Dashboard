const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { studentModel } = require('../model/studentSchema');
const { streamModel } = require('../model/streamSchema');
const UserRouter = express.Router();

UserRouter.post('/register', async (req, res) => {
    const { name, email, password, age, year, streamName } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const stream = await streamModel.findOne({ name: streamName });

        if (!stream) {
            return res.status(400).send({ error: true, message: 'Stream not found' });
        }

        const newUser = new studentModel({ name, email, password: hashedPassword, age, year, stream: stream._id });
        await newUser.save();
        return res.status(201).send({ error: false, items: newUser });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: true, message: 'Server error' });
    }
});

UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            const accessToken = jwt.sign(
                { data: { email: adminEmail, role: 'admin' } },
                process.env.SECRETKEY,
                { expiresIn: '1hr' }
            );

            return res.status(200).send({ error: false, role: 'admin', accessToken });
        }

        const student = await studentModel.findOne({ email });
        if (!student) {
            return res.status(400).send({ error: true, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(400).send({ error: true, message: "Wrong password" });
        }

        const accessToken = jwt.sign({ data: { email: student.email, role: 'admstudentin' } }, process.env.SECRETKEY, { expiresIn: '1hr' });
        return res.status(200).send({ error: false, role: 'student', accessToken });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: true, message: "Server error" });
    }
});

module.exports = { UserRouter }