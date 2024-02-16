const { Category } = require('../models/category.model');

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

module.exports = {
    getCategoryIdByName,
    getAllCategories,
    createCategory
}