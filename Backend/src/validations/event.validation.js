const Joi = require("joi");

const schemaOfCreation = Joi.object({
    name: Joi.string().min(3).max(255).required(),

    description: Joi.string().min(10).required(),

    categoryId: Joi.number().integer().positive().required(),

    startDate: Joi.date().required(),
    
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),

    startTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).required(),
    
    endTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).required(),


    venueId: Joi.number().integer().positive().required(),

    price: Joi.number().positive().required(),
});
const schemaOfUpdating= Joi.object({
    name: Joi.string().min(3).max(255),
    description: Joi.string().min(10),
    categoryId: Joi.number().integer().positive(),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    startTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/),
    endTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/),

    venueId: Joi.number().integer().positive(),
    status: Joi.string().valid('Available', 'Finished', 'Cancelled'),
    price: Joi.number().positive()
});

function validateEventData (data){
    try {
        const { error,value } = schemaOfCreation.validate(data);
        return {error,value};
    } catch (err) {
        throw new Error(err.message);
    }
}
function validateEventDataUpdate (data){
    try {
        const { error,value } = schemaOfUpdating.validate(data, { abortEarly: false });
        return {error,value};
    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {validateEventData,validateEventDataUpdate};
