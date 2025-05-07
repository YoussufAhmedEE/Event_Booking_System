const { AuthenticationServices} = require("../services/authentication.service");


class AuthenticationController {
    
static register =async (req,res)=>{
    try {
        const registerData= req.body
        const response = await AuthenticationServices.register(registerData);
        if (response.error) {
            return res.status(400).json({ error: response.error });
        }
        res.status(200).cookie('jwt', response.token, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 })
        .json({ message: "User created successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

static login =async (req , res) => {
    try {
        const loginData =  req.body ; 
        const response = await AuthenticationServices.login(loginData);
        if (response.error) {
            return res.status(400).json({ error: response.error});
        }
        res.status(200).cookie('jwt' , response.token , {httpOnly:false , sameSite: 'None',  secure: false ,  maxAge : 24 * 60 * 60 * 1000})
        .json({message : "Logged in Succesfully"});
        
    } catch (err) {
        res.status(400).json({ error : err.message });
    }

}
}

module.exports = {AuthenticationController};