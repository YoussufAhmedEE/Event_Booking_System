const {getCategoriesService}=require("../services/category.services")
const getCategories= async(req,res)=>{
     try {
    const categoirs = await getCategoriesService();
    res.status(200).json({ success: true, categoirs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports={getCategories}