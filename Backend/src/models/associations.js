const {User} =require('./user.model');
const {Role} =require('./role.model');
const {UserRole} =require('./userRole.model');
const {Event,EventImage} =require('./event.model');
const {EventTag} =require('./eventTags.model');
const {Tag} =require('./tag.model');
const {Category} =require('./category.model');
const {Booking} =require('./bookings.model');
const { db } = require('../config/database');

//Many-to-many relationship between User and Role
User.belongsToMany(Role, { through: UserRole, foreignKey: "userId" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId" });

//many-to-many relationship between Event and Tags
Event.belongsToMany(Tag, { through: EventTag, foreignKey: "eventId" });
Tag.belongsToMany(Event, { through: EventTag, foreignKey: "tagId" });

//Event → Category (Many-to-One)
Event.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Event, { foreignKey: 'categoryId' });

Tag.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Tag, { foreignKey: 'categoryId' });


//Event → EventImage (One-to-Many)
Event.hasMany(EventImage, { foreignKey: 'eventId' });
EventImage.belongsTo(Event, { foreignKey: 'eventId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Booking, { foreignKey: 'eventId' });
Booking.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = {
    User, Role, UserRole, Event,EventImage,EventTag,Tag,Category,Booking,
    db
};