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

router.delete('/:postID', async (req, res) => {
    const { postID } = req.params;
    try {
        const post = await service.deletePost(postID);
        if (post) {
            res.status(200).json({ message: 'post deleted successfully' });
        } else {
            res.status(401).json({ message: 'Invalid post' });
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:postID/likes', async (req, res) => {
    const { postID } = req.params;
    try {
        const usernames = await service.getLikesOfPost(postID);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error getting post likes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:postID/like', async (req, res) => {
    const { postID } = req.params;
    const { username } = req.body;
    try {
        const like = await service.likePost(postID, username);
        if(!like) {
            res.status(500).json({ message: 'This post was liked previously'});
        }
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:postID/unlike', async (req, res) => {
    const { postID } = req.params;
    const { username } = req.body;
    try {
        const like = await service.unLikePost(postID, username);
        if(!like) {
            res.status(500).json({ message: 'This post was not liked previously'});
        }
        res.status(200).json({ message: 'Post liked successfully'});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;