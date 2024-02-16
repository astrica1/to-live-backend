const { Post } = require('../models/post.model.js');
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
        const categoryId = await getCategoryIdByName(categoryName);
        const post = await Post.create({
            title: title,
            content: content,
            categoryID: categoryId,
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


module.exports = {
    getAllPosts,
    createPost,
    getPost
};