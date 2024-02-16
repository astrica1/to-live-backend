const { sequelize, DataTypes, authenticate, sync, fsync } = require('./index.model');
const { Post } = require('./post.model');
const { User } = require('./user.model');

authenticate();

const Like = sequelize.define("likes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});

Like.belongsTo(User, {
    foreignKey: {
        name: 'username',
        allowNull: false
    }
});

Like.belongsTo(Post, {
    foreignKey: {
        name: 'postID',
        allowNull: false
    }
});

if (process.argv.includes('force')) {
    fsync('like')
} else {
    sync('like');
}

module.exports = {
    Like
};