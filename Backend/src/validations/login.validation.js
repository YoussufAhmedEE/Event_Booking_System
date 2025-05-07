const joi =require('joi');

const schema= joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
});


function validateLoginData (data){
    try {
        const { error,value } = schema.validate(data);
        return {error,value};
    } catch (err) {
        throw new Error(err.message);
    }

}

module.exports=validateLoginData;
