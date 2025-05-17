const {AIServices}= require('../ai/grok')
require("../models/associations");


const {Event}=require("../models/event.model");
const {Category}=require("../models/category.model");
const {Tag}=require("../models/tag.model");
const {EventTag}=require("../models/eventTags.model");


const suggestAndSaveTagsForEvents = async () => {
    try {
      const events = await Event.findAll({
        include: [{ model: Category, attributes: ["id", "name"] }],
        attributes: ["id", "name", "description"]
      });

      for (const event of events) {
        const category = event.Category;
        if (!category) continue;

        const categoryName = category.name;
        const categoryId = category.id;
        const description = event.description || "";

       const { tags, error, message } = await AIServices.suggesTags({
            category: categoryName,
            description: description,
            numberofTags: 2
          });

          if (error) {
            console.error(`AI error for event ${event.id}:`, message);
            continue;
          }
        for (const tagName of tags) {
          // check if the tag already exists for this category
          let tag = await Tag.findOne({
            where: { name: tagName, categoryId }
          });

          // if not, create it
          if (!tag) {
            tag = await Tag.create({
              name: tagName,
              categoryId
            });
          }

          // check if relation exists in EventTag
          const existingEventTag = await EventTag.findOne({
            where: {
              eventId: event.id,
              tagId: tag.id
            }
          });

          // if not, create the relation
          if (!existingEventTag) {
            await EventTag.create({
              eventId: event.id,
              tagId: tag.id
            });
          }
        }
      }

      return { success: true, message: "Tags suggested and saved successfully." };

    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };


  suggestAndSaveTagsForEvents();