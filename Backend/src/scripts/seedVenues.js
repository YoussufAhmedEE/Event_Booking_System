const {Venue} = require("../models/venue.model");
const venuesData = require("../fakeData/venues.json");

const seedVenues = async () => {
  try {
        await Venue.bulkCreate(venuesData);
    console.log("✅ Venues Seeded Successfully");
  } catch (error) {
    console.error("❌ Error seeding venues:", error);
  }
};

seedVenues();
