const express = require("express");
const router = express.Router();
const { validateUser } = require("../middleware/authMiddleware");


const service = require('../services/posts');

router.get('/all', async (req, res) => {
    try {
        const posts = await service.getAllPosts();
        res.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { title, content, category, username } = req.body;
    try {
        const post = await service.createPost(title, content, username, category);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:postID', async (req, res) => {
    const { postID } = req.params;
    try {
        const post = await service.getPost(postID);
        if (post == null) {
            res.status(404).json({message: 'Post not found'});
            return
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:postID', (req, res) => {
    const { postID } = req.params;
    res.json({ message: `post: ${postID} is updated` });
});

router.delete('/:postID', (req, res) => {
    const { postID } = req.params;
    res.json({ message: `post: ${postID} is deleted` });
});

router.get('/:postID/likes', (req, res) => {
    const { postID } = req.params;
    res.json({ message: `list of post ${postID} likes` });
});

router.post('/:postID/like', validateUser, (req, res) => {
    const { postID } = req.params;
    const { user } = req.body;
    res.json({ message: `post ${postID} liked by ${user}` });
});

router.post('/:postID/unlike', validateUser, (req, res) => {
    const { postID } = req.params;
    const { user } = req.body;
    res.json({ message: `post ${postID} unliked by user ${user}` });
});


module.exports = router;