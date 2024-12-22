const express = require("express");
const User = require("../models/User");

// check for .env syntaxes properly
require('dotenv').config()
const { JWT_SECRET_SIGN } = process.env;

const router = express.Router();
//we use bycryptjs for creating salt and hash for authentication
const bcrypt = require('bcryptjs');
//we need to use jsonwebtoken for generating a token for the security based on generated hash of bcrypt to provide it to user for login
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
// get and post will vary, get can accessed more than post so to maintain confidentiality we use post
// we can also use req.query to get the data from the url
// we need to have a sign for our side validation
// we need to use middleware to validate and get the data of the user from token
const fetchUser = require("../middleware/fetchUser");

// Route-1 : to create an user after checking the valid conditions and later storing it in database.
router.post("/createuser",[
    // these are conditions for the validations and these written in this array
    body("name","Enter a valid Name").isLength({min : 3}),
    body("email","Enter a valid Email").isEmail(),
    body("password","Enter a valid Password").isLength({min : 5})
    ],
    async (req, res)=>{
    const errors = validationResult(req);
    // bad error request 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        // here user is used as a temp obj for mongo
        let user = await User.findOne({email: req.body.email});
        // if user already exists
        if(user){
            return res.status(400).json({message : "An User with same email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : securePassword
        });
        // .then(user => res.json(user))
        // .catch(err=> res.status(400).json({
        //     error: "please enter unique and valid email to move ahead.",
        //     message: err.message
        // })) // this is another way to add data to mongo
        // console.log(req.body);
        // const user = User(req.body);
        // user.save(); // another way to send data to mongo using defined user mongoose schema
        // // res.json([{ "name" : "Harshith","age" : 22,"city" : "Amalapuram",}]);
        const data = {
            user: user.id
        }
        const authToken = jwt.sign(data,JWT_SECRET_SIGN);
        console.log(`Login details of user named ${req.body.name} are succesfully stored in the mongoDB and token is also generated.`);
        return res.json({authToken: authToken});
        
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send("some error occured");
    }
})

// Route-2 : to validate and provide a token to user for next step validation in our application.
router.post("/login",[
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 5 })
    ], 
    async (req, res)=>{
        //console.log("mg chai");
    const errors = validationResult(req);
    //console.log("mg chai 3");
    // bad error request 
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    //console.log(email,password);
    try{
        // here user is used as a temp obj for mongo
        let user = await User.findOne({email : email});
        // if user already exists
        //console.log("if paina");
        if(!user){
            //console.log("if lopala");
            return res.status(400).json({error : "Please try to login with correct credentials"});
        }
       // console.log("if bayata");
        const passwordCompare = await bcrypt.compare(password,user.password);
        //console.log("2nd if paina");
        if(!passwordCompare){
            //console.log("2nd if lopala");
            return res.status(400).json({error : "Please try to login with correct credentials"});
        }
        //console.log("2nd if bayata");
        const data = {
            user: user.id
        }
        //console.log("mg mg mg mg",data);
        const authToken = jwt.sign(data,JWT_SECRET_SIGN);
        //console.log( "checking :", authToken);
        return res.json({authToken: authToken});
    }
    catch(err){
        //console.log("hello")
        console.error(err.message);
        return res.status(500).send("Some Internal Error Occured");
    }
})

// Route-3 : in this step we take the token and validate the token and provide the data of the user for futher app steps.
router.post("/getUser", [fetchUser], 
    async (req, res) => {
        try {
            const userId = req.user;
            if(!userId){
                return res.status(401).send({error: "authenticate using proper token"});
            }
            const user = await User.findById(userId).select("-password");
            console.log("Token verified succesfully.");
            return res.send(user);
        }
        catch(err){
            console.error(err.message);
            return res.status(401).send("Some Internal Error Occured");
        }
    }
)
module.exports = router;