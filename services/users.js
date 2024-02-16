const { User } = require('../models/user.model');

async function getAllUser() {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users');
    }
}

async function createUser(username, name, email, password, isAdmin) {
    try {
        const user = await User.create({
            username: username,
            name: name,
            email: email,
            password: password,
            isAdmin: isAdmin
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
}

async function loginUser(username, password) {
    try {
        const user = await User.findOne({ where: { username: username, password: password } });
        return user !== null;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
    }
}

async function getUserByUsername(username) {
    try {
        const user = await User.findOne({ where: { username: username } });
        if (user) {
            user.password = '';
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
    }
}

async function deleteUser(username, password) {
    try {
        const user = await User.findOne({ where: { username: username, password: password } });
        if(user) {
            user.destroy();
            return true
        }
        return false
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
}

module.exports = {
    getAllUser,
    createUser,
    loginUser,
    getUserByUsername,
    deleteUser
};