const { sequelize, DataTypes, authenticate, sync, fsync } = require('./index.model');

authenticate();

const User = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

if (process.argv.includes('force')) {
    fsync('user')
} else {
    sync('user');
}

module.exports = {
    User
};