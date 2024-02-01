const { isValidUser } = require("../utils/authUtils")

const validateUser = (req, res, next) => {
    if (isValidUser(req.body.username, req.body.password)) {
        return res.status(401).json({ error: "Invalid credentials" })
    }

    next()
}

const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
};

module.exports = { validateUser, authenticateUser }