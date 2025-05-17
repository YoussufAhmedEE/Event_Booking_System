const Groq = require("groq-sdk");
const {API_KEY,AI_MODEL}=require('../config/index')

class AIServices{

    static suggesTags = async ({category,description,numberofTags}) => {
 
        const groq = new Groq({ apiKey: API_KEY });

        const prompt = `Based on the event category "${category}" \
        and the following description: "${description}",\
        suggest ${numberofTags} relevant and popular tags or keywords (without the # sign) that would best describe and promote this event.\
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

module.exports={AIServices}