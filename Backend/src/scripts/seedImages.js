const { EventImage } = require('../models/event.model'); // adjust the path if needed
const { Sequelize } = require('sequelize');

const duplicateImages = async () => {
  try {
    // Get all images for event ID 1
    const originalImages = await EventImage.findAll({
      where: { eventId: 1 },
    });

    if (originalImages.length < 3) {
      console.log("Not enough images to select 3 randomly.");
      return;
    }

    for (let newEventId = 2; newEventId <= 19; newEventId++) {
      if (newEventId === 10) continue;

      // Select 3 random images from the original set
      const selectedImages = shuffleArray([...originalImages]).slice(0, 3);

      const newImageData = selectedImages.map(img => ({
        eventId: newEventId,
        imageUrl: img.imageUrl,
        publicId: img.publicId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Bulk insert
      await EventImage.bulkCreate(newImageData);
      console.log(`Inserted 3 images for event ID ${newEventId}`);
    }

    console.log("✅ Duplication complete!");
  } catch (error) {
    console.error("❌ Error duplicating images:", error);
  }
};

// Helper to shuffle an array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Run the script
duplicateImages();
