const express = require("express");
const router = express.Router();
const service = require('../services/users');

router.get('/all', async (req, res) => {
    try {
        const users = await service.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/id/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await service.getUserByUsername(username);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/register', async (req, res) => {
    const { username, name, email, password, isAdmin } = req.body;
    try {
        const user = await service.createUser(username, name, email, password, isAdmin);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await service.loginUser(username, password);
        if (user) {
            res.status(200).json({ message: 'Logged in successfully' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deactive', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await service.deleteUser(username, password);
        if (user) {
            res.status(200).json({ message: 'user deactived successfully' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;