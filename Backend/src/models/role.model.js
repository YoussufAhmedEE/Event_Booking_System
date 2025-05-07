
const { DataTypes } = require('sequelize');
const {db} = require('../config/database'); 

const ROLES_ENUM = ["Admin", "User","SystemOwner"];

const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.ENUM(...ROLES_ENUM),
        allowNull: false,
        // unique: true
    },
},
{
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });

module.exports = {Role,ROLES_ENUM};