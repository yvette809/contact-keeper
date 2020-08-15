const express =require ("express");
const authRouter = express.Router();
const userModel = require("./models/schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const config = require ("config")

// @ route    GET api/auth
authRouter.get('/', (req,res)=>{
    res.send('get loged in user')
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
    const {email,password} = req.body
}
);



module.exports = authRouter;