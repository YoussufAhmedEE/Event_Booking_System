
const{TagServices}=require('../services/tag.services')

class TagsController{
    static suggest=async (req,res)=>{
    try{
        const {categoryId,description}=req.body
        console.log("From COntroller:", req.body)
        const response =await TagServices.suggest({categoryId,description});
        if(response.error){
            new Error(response.message)
        }
        res.status(200).json({tags: response.tags})

    }catch(error){
        res.status(500).json({error:error.message})
    }
    }
}


module.exports={TagsController}