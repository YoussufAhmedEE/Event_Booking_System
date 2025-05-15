const { DataTypes } = require('sequelize');
const {db} = require('../config/database'); 

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true

    },
    gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: true,
    },
});

module.exports = {User};