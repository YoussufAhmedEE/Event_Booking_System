const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),

    description: Joi.string().min(10).required(),

    categoryId: Joi.number().integer().positive().required(),

    startDate: Joi.date().required(),
    
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),

    startTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/) .required(),// hh:mm format

    endTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/) .required(),

    venue: Joi.string().min(3).required(),

    location: Joi.string().min(3).required(),

    price: Joi.number().positive().required(),
});

function validateEventData (data){
    try {
        const { error,value } = schema.validate(data);
        return {error,value};
    } catch (err) {
        throw new Error(err.message);
    }

}

module.exports = validateEventData;
