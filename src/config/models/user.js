'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        google_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        interests: {
            type: DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        last_login_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {});
    user.associate = function(models) {
        // associations can be defined here
    };
    return user;
};