const tagRouter= require("express").Router();
const {isAdmin}=require('../middlewares/authentication.middleware');
const {TagsController}=require('../controllers/tag.controller')


tagRouter.post('/suggest',isAdmin,TagsController.suggest)



module.exports={tagRouter}