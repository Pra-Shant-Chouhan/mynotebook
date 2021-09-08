const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

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
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        res.json(user)


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error occured");
    }


})
module.exports = router
