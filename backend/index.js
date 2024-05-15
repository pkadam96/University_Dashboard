const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./config/dbConnect");
const { streamRouter } = require("./routes/streamRouter");
const { studentRouter } = require("./routes/studentRouter");
const { subjectRouter } = require("./routes/subjectRouter");
const { marksRouter } = require("./routes/marksRouter");
const { UserRouter } = require("./routes/userRouter");
const { auth } = require("./middleware/auth.middleware");
const { isAdmin, isStudent } = require('./middleware/access.middleware');
const app = express();
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("server is running");
})

app.use("/user", UserRouter);
app.use("/stream", auth, isAdmin, streamRouter);
app.use("/student", auth, studentRouter);
app.use("/subject", auth, isAdmin, subjectRouter);
app.use("/mark", auth, isAdmin, marksRouter);


app.listen(process.env.PORT, async () => {
    await connectToDB();
    console.log(`Server is running on port ${process.env.PORT}`);
})