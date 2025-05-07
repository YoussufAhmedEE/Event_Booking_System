const {DataTypes} = require('sequelize');
const {db} = require('../config/database');
const {Category} = require('./category.model');
const Event=db.define('Event',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Category,
            key:'id'
        }
    },
    date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
        allowNull:false
    }, 
    venue:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type:DataTypes.ENUM('Available','Finished','cancelled'),
        defaultValue:'Available'
    }, 
    Price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
},
{  
    timestamps: true,
});


const EventImage = db.define("EventImage", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: 'id',
        },  
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });

module.exports={Event,EventImage};

