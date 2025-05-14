const express = require('express');
const imageRouter = express.Router();
const upload = require('../middlewares/image.middleware');
const { ImageController } = require('../controllers/image.controller');

imageRouter.post('/upload/:id',upload.single('image'), ImageController.uploadImage);

module.exports = {imageRouter};
