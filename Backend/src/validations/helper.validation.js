
class HelperValidations{
    
    static validateId(id) {
        if (typeof id !== 'number'||id <= 0) {
            return false;
        }
        return true;
    }
}

module.exports={HelperValidations}