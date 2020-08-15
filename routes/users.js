const express =require ("express");
const UsersRouter = express.Router();
const userModel = require("./models/schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const config = require ("config")

// @ route    POST api/users    
// @description   Register a user
// @access         public
UsersRouter.post('/',[
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({min:6})
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {name,email,password} = req.body;
    try{
        let user = await userModel.findOne({email:email});
        // it means find user with the email variable
        if(user){
            return res.status(400).json({msg: "user already exists"})
        }else{
            user = new userModel({
                name:name,
                email:email,
                password:password
                
            });

            //we need to encrypt the password with bcrypt before saving in to the database
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save();

            // create a payload to send to the user whn registering(jsonwebtoken)
            //jwt takes 4 parameers; payload, secret, object of options like expirtion date and call back function
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

    }catch(err){
        console.error(err.message);
        res.status(500).send('server Error')
    }
})



module.exports = UsersRouter;