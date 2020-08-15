const jwt = require("jsonWebtoken")
const config = require("config")



module.exports = function(req,res,next){
    // get token from the header
    const token = req.header("x-auth-token")

    // check if token does not exist
    if(!token){
        return res.status(401).json({msg: "No token, authorisation denied"})
    }else{
        //if there is a token we need to verify it
        try{
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            // we take just the user out of the decoded object
            req.user = decoded.user;
            next();

        }catch(err){
            res.status(401).json({msg: "Token is not valid"})

        }

    }

    
}