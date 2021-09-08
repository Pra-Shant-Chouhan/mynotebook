const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Bitt2isAwasomProgramerAndgetJob";

//Create a User using: POST  "/api/auth/createuser" Doesn't require Authentication
router.post('/createuser', [
    // name must be at least 5 chars long using express validator
    body('name', 'enter a valid name').isLength({ min: 2 }),

    // username must be an email using express validator
    body('email').isEmail().withMessage({    // check(field, withMessage) and .withMessage() work the same
        message: 'Not an email',
        errorCode: 1,
    }),
    // password must be at least 5 chars long
    body('password', "password Must be atleast five letters").isLength({ min: 5 })

], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Cheak whether the user with this email exists already

    try {


        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: "Sorry the email already exits" })

        }
        //Store hash in your password DB.
        const salt = await bcrypt.genSalt(10);
        securePassWord = await bcrypt.hash(req.body.password, salt)

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: securePassWord,
            email: req.body.email
        })

        //using jason web token here 
        const data = {
            user: {
                id: user.id
            }
        }

        const authinticationData = jwt.sign(data, JWT_SECRET);
        // console.log(authinticationData)

        // res.json(user)
        res.json({ authinticationData })


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error occured");
    }


})

// Authentication a User using: POST  "/api/auth/login" to log in required
router.post('/login', [
    
    // username must be an email using express validator
    body('email').isEmail().withMessage({    // check(field, withMessage) and .withMessage() work the same
        message: 'Not an email',
        errorCode: 1,
    }),

    body('password', "password can not be empty").exists(),

    

], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "plese try to login with correct  credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "plese try to login with correct  credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authinticationData = jwt.sign(data, JWT_SECRET);

        res.json({authinticationData})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error occured");
    }
})
module.exports = router
