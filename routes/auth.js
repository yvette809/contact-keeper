const express =require ("express");
const authRouter = express.Router();
const userModel = require("./models/schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const config = require ("config")
const auth = require("../middleware/auth")

// @ route    GET api/auth
// @desc       Get logged in user   //login
// access       private
authRouter.get('/',auth, async(req,res)=>{
    try{

        // we don't want to return the password in the response so we use select("-password")
        const user = await userModel.findById(req.user.id).select("-password")
        // we are able to access the token through req.user because in our middleware we assigned it to req.user
        res.json(user);

    }catch(err){
        console.error(err.message)
        res.status(500).send('server Error');
    }
})

// @router   POST api/auth
//@desc      Auth user and get token
// access    public

authRouter.post('/', [
   check('email', 'please include a valid email').isEmail(),
   check('password', 'password is required').exists() 
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({  errors:errors.array() })
}
    // we extract just the email and the password from the body without the name bc we are logging in
    const {email,password} = req.body;
    try{

        let user = await userModel.findOne({email});
        //if user does not exist we send a message of invalid credentials
        if(!user){
            return res.status(400).json({msg:'Invalid credentials'})
        }else{
            const isMatch = await bcrypt.compare(password,user.password)
            // password is the password variable we type and the user.password is the harsh password that was stored 
            if(!isMatch){
                return res.status(400).json({msg: "invalid credentials"})
            }else{
                const payload = {
                    user:{
                        id:user.id
                    }
                }
                jwt.sign(payload, config.get('jwtSecret'),{ expiresIn:360000}, (err,token)=>{
                    if(err) {
                        throw err
                    }else{
                        res.json({token})
                    }
                   
                })
                
            }
        }

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}
);



module.exports = authRouter;