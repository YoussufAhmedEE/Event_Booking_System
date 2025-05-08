const Groq = require("groq-sdk");
const {API_KEY,AI_MODEL}=require('../config/index')
const {Category}= require('../models/category.model')
const {Tag}= require('../models/tag.model')
const {EventTag}= require('../models/eventTags.model')
const {HelperValidations}=require('../validations/helper.validation');

class TagServices{
  
  //Read Tags Avialable for this category, And Suggest tags related to description and category Using AI
 
  static suggest = async ({ categoryId, description }) => {
    try {

      if(!HelperValidations.validateId(categoryId)){
        return { error: true, message: `invalid ID` };

      }
      // 1. Get category name
      const categoryRecord = await Category.findOne({ where: { id: categoryId }, attributes: ['name'] });
      
      if (!categoryRecord) {
        return { error: true, message: `Category with id ${categoryId} not found` };
      }
  
      const categoryName = categoryRecord.name;
  
      // 2. Get tags from DB
      const tagsFromDatabase = await Tag.findAll({
        where: { categoryId: categoryId },
        attributes: ['name']
      });
  
      const dbTagsArray =tagsFromDatabase.map(tag => tag.name)||[];
      console.log("tagsFromDatabase: ",dbTagsArray)
      // 3. Get tags from AI
      const tagsFromAIResponse = await AIServices.suggesTags({ category: categoryName, description });

      const aiTagsArray = tagsFromAIResponse.tags || [];
      console.log("tagsFromAIResponse: ",aiTagsArray)

      if(aiTagsArray.length>0){
        await SaveTagsinDatabase.insert({tags:aiTagsArray,categoryId})
      }
  
      // 4. Combine both arrays and remove duplicates
      const combinedTags = Array.from(new Set([...dbTagsArray, ...aiTagsArray]));
      
  
      return {tags: combinedTags };
  
    } catch (error) {
      return { error: true, message: error.message };
    }
  };
  //Add Tags To an event
  static addEventTags =async({tags, categoryId, eventId})=>{
        if(!HelperValidations.validateId(categoryId)){
          return { error: true, message: `invalid ID` };
        }
        const categoryRecord = await Category.findOne({ where: { id: categoryId } });
      
        if (!categoryRecord) {
          return { error: true, message: `Category with id ${categoryId} not found` };
        }

        const savedTags = await SaveTagsinDatabase.insert({ tags, categoryId });

        const EventTags = [];
        for (const tag of savedTags.data) {
         let eventtag= await EventTag.create({
            eventId: eventId,
            tagId: tag.id
          });
         EventTags.push(eventtag)
        }
        return{EventTags}

  }
//delete Tag from an event
  static deleteEventTag = async ({ tag, eventId }) => {
    try {
      const _tag = await Tag.findOne({
        where: { name: tag },
        attributes: ['id']
      });
  
      if (!_tag) {
        return { error: true, message: "Tag not found" };
      }
  
      const eventTag = await EventTag.findOne({
        where: {
          eventId: eventId,
          tagId: _tag.id
        }
      });
  
      if (!eventTag) {
        return { error: true, message: "EventTag relation not found" };
      }
  
      await eventTag.destroy();
  
      return { success: true, message: "EventTag deleted successfully" };
  
    } catch (error) {
      console.error("Error while deleting EventTag:", error);
      return { error: true, message: error.message };
    }
  };
}

class SaveTagsinDatabase{
  static insert = async ({ tags, categoryId }) => {
    try {
      const results = [];
  
      for (const tagName of tags) {
        // Check if tag already exists in the database for the same category
        let existingTag = await Tag.findOne({
          where: {
            name: tagName,
            categoryId: categoryId
          }
        });
  
        // If it doesn't exist, add it
        if (!existingTag) {
          existingTag = await Tag.create({
            name: tagName,
            categoryId: categoryId
          });
        }
  
        // Push the tag record (existing or newly created) to results array
        results.push(existingTag);
      }
  
      return { success: true, message: "Tags saved successfully", data: results };
  
    } catch (error) {
      console.error("Error while saving tags:", error);
      return { error: true, message: error.message };
    }
  };
}


class AIServices{

    static suggesTags = async ({category,description}) => {
 
        const groq = new Groq({ apiKey: API_KEY });

        const prompt = `Based on the event category "${category}" \
        and the following description: "${description}",\
        suggest 10 relevant and popular tags or keywords (without the # sign) that would best describe and promote this event.\
        Return them as a simple, comma-separated list.`;
    
      try {
        // Send the request to the API for chat completion
        const response = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: AI_MODEL, 
        });
    
        const content = response.choices[0]?.message?.content;

        if (!content) {
          return { error: true, message: "No tags returned from AI model." };
        }
    
        const tagsArray = content.split(",").map((tag) => tag.trim());
        return { tags: tagsArray };
    
      } catch (error) {
        return{error:true, message:`occurred while communicating with the AI model: ${error.message}`}
      }
    };
}

module.exports={TagServices}



