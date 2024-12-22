const jwt  = require("jsonwebtoken");
require('dotenv').config()
const { JWT_SECRET_SIGN } = process.env;

function fetchUser(req, res, next) {
    // getting the token and send the userId
    const token = req.header("auth-token");
    //console.log("hi :" + token);
    if(!token){
        return res.status(401).send({error: "Please authenticate using proper token"});
    }
    try{
        const data = jwt.verify(token,JWT_SECRET_SIGN);
        //console.log(data);
        req.user = data.user;
        //console.log(req.user);
        next();
    }
    catch(err){
        console.error(err.message);
        return res.status(401).send({error: "Please authenticate using proper token"});
    }
    
}
module.exports = fetchUser;