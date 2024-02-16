const { Category } = require('../models/category.model');
const { Post } = require('../models/post.model');

async function getCategoryIdByName(categoryName) {
    try {
        const category = await Category.findOne({ where: { name: categoryName } });
        if (!category) {
            throw new Error('Category not found');
        }
        return category.id;
    } catch (error) {
        console.error('Error fetching category ID:', error);
        throw new Error('Error fetching category ID');
    }
}

async function getAllCategories() {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
    }
}

async function createCategory(categoryName) {
    try {
        const category = await Category.create({
            name: categoryName
        });
        return category;
    } catch (error) {
        console.error('Error creating category:', error);
        throw new Error('Error creating category');
    }
}

async function getAllPostsOfCategory(categoryName) {
    try {
        const posts = await Post.findAll({ where: { categoryID: categoryName } });
        return posts;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
    }
}

async function removeCategory(categoryName) {
    try {
        const category = await Category.findOne({ where: { name: categoryName } });
        if (category) {
            category.destroy()
            return true
        }
        return false
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
    }
}

module.exports = {
    getCategoryIdByName,
    getAllCategories,
    createCategory,
    getAllPostsOfCategory,
    removeCategory
}