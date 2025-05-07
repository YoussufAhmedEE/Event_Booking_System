
const { User } = require('../models/user.model');
const { Role } = require('../models/role.model');
const { UserRole } = require('../models/userRole.model');
const  createToken  = require('../utilities/token.utility');
const  createHash = require('../utilities/hash.utility');
const validateRegisterData = require('../validations/register.validation');
const validateLoginData=require('../validations/login.validation')
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");

class AuthenticationServices {

    static register = async (data) => {
        
        try{
                const { error,value }=validateRegisterData(data);
                if (error) {
                    return {error: error.details[0].message};
                }
                const user = await User.findOne({
                            where: {
                                [Op.or]: [
                                    { email: value.email },
                                    { phoneNumber: value.phoneNumber }
                                ]
                            }
                        });
                
                if (user) {
                return {error:'Email or Phone number already exist'};
                }
                const hashedPassword = await createHash(value.password);
                
                const newUser = await User.create({
                    firstName: value.firstName,
                    lastName: value.lastName,
                    email: value.email,
                    password: hashedPassword,
                    phoneNumber: value.phoneNumber,
                    gender: value.gender});

                    const RegularRole= await Role.findOne({
                        where: {
                            name: 'User'
                        },
                    })

                await UserRole.create({
                    userId: newUser.id,
                    roleId: RegularRole.id
                });

                const token = createToken(newUser.id , RegularRole.name);

                return {token};

        }catch (error) {  
            return { error: error.message };

        }
}


    static login=async (data) => {
        try {
            const {error,value} = validateLoginData(data);

            
            if(error){
                return {error:error.details[0].message}
            }


            const user = await User.findOne({
                where: { email: value.email },
                include: [
                  {
                    model: Role,
                    attributes: ['name'],
                    through: { attributes: [] },
                  },
                ],
              });
              

            if(!user){
                return{error: "Email not exist"}
            }
            
            const checkPassword = await bcrypt.compare(value.password , user.password);  
            
            if(!checkPassword){
                return{error: "Wrong password!"}
            }

            const roles = user?.Roles?.map(role => role.name);
        

            const token=createToken(user.id,roles)

            return{token}


        }catch(error){
            return {error:error.message}
        }
    }

}

module.exports = {AuthenticationServices };