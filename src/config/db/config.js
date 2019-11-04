const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development": {
        "username": "root",
        "password": null,
        "database": "node_app",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "seederStorage": "sequelize",
        "seederStorageTableName": "sequelize_data"
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        "seederStorage": "sequelize",
        "seederStorageTableName": "sequelize_data"
    }
}