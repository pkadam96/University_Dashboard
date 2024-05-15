const jwt = require("jsonwebtoken");

// Middleware to check if user has admin role
const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        if (decoded.data.role !== 'admin') {
            return res.status(403).send({ error: true, message: "Admin access required" });
        }
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).send({ error: true, message: "Unauthorized" });
    }
};

// Middleware to check if user has student role
const isStudent = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        if (decoded.role !== 'student') {
            return res.status(403).send({ error: true, message: "Student access required" });
        }
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).send({ error: true, message: "Unauthorized" });
    }
};

module.exports = { isAdmin, isStudent };
