const {DataTypes} = require('sequelize');
const {db} = require('../config/database');

const EventTag = db.define('EventTag',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    eventId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Event',
            key:'id'
        }
    },
    tagId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Tag',
            key:'id'
        }
    }
},
{  
    timestamps: true,
});

module.exports={EventTag};