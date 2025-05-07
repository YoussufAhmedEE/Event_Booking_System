const joi = require('joi');

const schema= joi.object({
    firstName:joi.string().min(3).max(30).required(),
    lastName:joi.string().min(3).max(30).required(),
    email:joi.string().email().required(),
    password: joi.string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one letter and one special character.'
    }),
    confirmPassword:joi.string().valid(joi.ref('password')).required(),
    phoneNumber:joi.string().pattern(/^[0-9]{10}$/).required(), //Just 10 digits
    //phoneNumber: joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    // phoneNumber:joi.string().pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/).required(),
    // phoneNumber:joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
    gender:joi.string().valid("Male", "Female", "Other").required(),
});


function validateRegisterData (data){
    try {
        const { error,value } = schema.validate(data);
        return {error,value};
    } catch (err) {
        throw new Error(err.message);
    }

}

module.exports=validateRegisterData;
