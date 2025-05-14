const { ImageServices } = require('../services/image.services');

class ImageController{

  static async uploadImage  (req, res){
  try {
      if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const { path, filename } = req.file;

    const eventId = req.params.id;

    const newImage=await ImageServices.uploadImage({path,filename,eventId})

    res.status(201).json({
      message: 'Image uploaded successfully',
      data: newImage,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({message:error.message });
  }
};
}

module.exports = {
  ImageController,
};
