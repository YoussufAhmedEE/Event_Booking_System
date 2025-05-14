
const { EventImage } = require('../models/event.model');

class ImageServices{

 static async uploadImage ({ path, filename ,eventId}){

      return await EventImage.create({
        imageUrl: path,
        eventId:eventId,
        publicId: filename,
    });

}

}


module.exports={ImageServices}