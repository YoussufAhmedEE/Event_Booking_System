
const {Category}=require('../models/category.model')
const categories =require('../fakeData/categories.json')
const seedCategories = async () => {
    try {
      // Ensure database connection is established before seeding
      await Category.bulkCreate(categories);  // Insert categories into database

        console.log("Categories seeded successfully!");
    } catch (error) {
        console.error("Error seeding categories: ", error);
    }
};


seedCategories();