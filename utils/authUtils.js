const { User } = require("../models/user.model")

const isValidUser = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username } });
        return (user && user.password === password)
    } catch (error) {
        console.error("Error validating user:", error);
        return false;
    }
};

module.exports = { isValidUser };
