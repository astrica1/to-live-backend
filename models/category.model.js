const { sequelize, DataTypes, authenticate, sync, fsync } = require('./index.model');

authenticate();

const Category = sequelize.define("categories", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

if (process.argv.includes('force')) {
    fsync('category');
} else {
    sync('category');
}


module.exports = {
    Category
};