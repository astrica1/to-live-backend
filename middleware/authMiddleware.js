const { isValidUser } = require("../utils/authUtils")

const validateUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const userIsValid = await isValidUser(username, password);

        if (!userIsValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        next();
    } catch (error) {
        console.error("Error validating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
};

module.exports = { validateUser, authenticateUser }