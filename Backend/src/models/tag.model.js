const {DataTypes} = require('sequelize');
const {db} = require('../config/database');


const Tag = db.define('Tag',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
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