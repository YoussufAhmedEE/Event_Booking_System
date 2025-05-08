const {DataTypes} = require('sequelize');
const {db} = require('../config/database');
const { Category } = require('./category.model');


const Tag = db.define('Tag',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
},
{  
    timestamps: true,
});

module.exports={Tag};