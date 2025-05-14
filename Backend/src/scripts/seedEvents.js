
const {Event}=require('../models/event.model')
const events =require('../fakeData/events.json')
const seedEvents = async () => {
    try {
      await Event.bulkCreate(events);  // Insert events into database

        console.log("Events seeded successfully!");
    } catch (error) {
        console.error("Error seeding Events: ", error);
    }
};


seedEvents();