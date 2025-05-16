const {Category}= require("../models/category.model")

const getCategoriesService=async ()=>{
    try{
        const categoirs= await Category.findAll();
        return categoirs;
    }catch(error){
        return error;
    }
}
module.exports={getCategoriesService}