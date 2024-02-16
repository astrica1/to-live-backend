const { sequelize, DataTypes, authenticate, sync, fsync } = require('./index.model');
const { Category } = require('./category.model');
const { User } = require('./user.model')
    ;
authenticate();

const Post = sequelize.define("posts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Post.belongsTo(Category, {
    foreignKey: {
        name: 'categoryID',
        allowNull: false
    }
});

Post.belongsTo(User, {
    foreignKey: {
        name: 'author',
        allowNull: false
    }
});

if (process.argv.includes('force')) {
    fsync('post')
} else {
    sync('post');
}

module.exports = {
    Post
};