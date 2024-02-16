const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    'tolive',
    'root',
    null,
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    }
);

const authenticate = () => {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
};

const sync = (modelName) => {
    sequelize.sync().then(() => {
        console.log(modelName + ' table synced successfully!');
    }).catch((error) => {
        console.error('Unable to sync table : ', error);
    });
};

const fsync = (modelName) => {
    sequelize.sync({force: true}).then(() => {
        console.log(modelName + ' table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
};

module.exports = {
    sequelize,
    DataTypes,
    authenticate,
    sync,
    fsync
}