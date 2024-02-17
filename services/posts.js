const { Post } = require('../models/post.model.js');
const { Like } = require('../models/like.model.js');
const { getCategoryIdByName } = require('./categories')

async function getAllPosts() {
    try {
        const posts = await Post.findAll();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Error fetching posts');
    }
}

async function createPost(title, content, username, categoryName) {
    try {
        const post = await Post.create({
            title: title,
            content: content,
            categoryID: categoryName,
            author: username
        });
        return post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Error creating post');
    }
}

async function getPost(postID) {
    try {
        const post = await Post.findOne({ where: { id: postID } });
        return post;
    } catch (error) {
        console.error('Error getting post:', error);
        throw new Error('Error getting post');
    }
}

async function deletePost(postID) {
    try {
        const post = await Post.findOne({ where: { id: postID } });
        if(post) {
            post.destroy();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Error deleting post');
    }
}

async function getLikesOfPost(postID) {
    try {
        const post = await Post.findOne({ where: { id: postID } });
        if(!post) {
            return [];
        }
        const likes = await Like.findAll({ where: { postID: postID } });
        return likes;
    } catch (error) {
        console.error('Error getting post likes:', error);
        throw new Error('Error getting post likes');
    }
}

async function likePost(postID, username) {
    try {
        const liked = await Like.findOne({ where: { postID: postID, username: username } })
        if(liked) {
            return null;
        }

        const like = await Like.create({
            postID: postID,
            username: username
        });
        return like;
    } catch (error) {
        console.error('Error like post:', error);
        throw new Error('Error like post');
    }
}

async function unLikePost(postID, username) {
    try {
        const like = await Like.findOne({ where: { postID: postID, username: username } })
        if(like) {
            like.destroy();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error unlike post:', error);
        throw new Error('Error unlike post');
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    deletePost,
    getLikesOfPost,
    likePost,
    unLikePost
};