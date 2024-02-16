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
    },
    image: {
        type: DataTypes.BLOB('medium'),
        allowNull: true
    }
});

Post.belongsTo(Category, {
    'foreignKey': {
        name: 'categoryID',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Post.belongsTo(User, {
    'foreignKey': {
        name: 'author',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

if (process.argv.includes('force')) {
    fsync('post')
} else {
    sync('post');
}

module.exports = {
    Post
};