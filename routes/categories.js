const express = require("express");
const router = express.Router();
const service = require('../services/categories');

router.get('/all', async (req, res) => {
    try {
        const categories = await service.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/new', async (req, res) => {
    const { categoryName } = req.body;
    try {
        const category = await service.createCategory(categoryName);
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/id/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    try {
        const posts = await service.getAllPostsOfCategory(categoryName);
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/id/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    try {
        const category = await service.removeCategory(categoryName);
        if (category) {
            res.status(200).json({ message: 'category removed successfully' });
        } else {
            res.status(401).json({ message: 'Invalid category name' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;