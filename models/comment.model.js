const { sequelize, DataTypes, authenticate, sync, fsync } = require('./index.model');
const { Post } = require('./post.model');
const { User } = require('./user.model');

authenticate();

const Comment = sequelize.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Comment.belongsTo(User, {
    foreignKey: {
        name: 'username',
        allowNull: false
    }
});

Comment.belongsTo(Post, {
    foreignKey: {
        name: 'postID',
        allowNull: false
    }
});

if (process.argv.includes('force')) {
    fsync('comment')
} else {
    sync('comment');
}

module.exports = {
    Comment
};