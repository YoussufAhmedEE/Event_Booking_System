const {DataTypes} = require('sequelize');
const {db} = require('../config/database'); 

const {Event} = require('./event.model');
const {User} = require('./user.model'); 

const Booking = db.define('Booking',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    eventId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Event,
            key:'id'
        }
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: User,
            key:'id'
        }
    },
    status:{
        type:DataTypes.ENUM('confirmed', 'cancelled'),
        defaultValue:'confirmed'
    },
    bookingDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
},
{  
    timestamps: true,
});

module.exports={Booking};