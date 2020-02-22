const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../db/models/user');
// const db = require('../db/connection');

//schema for joi
const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(3).max(30).required(),
    password: Joi.string().min(6).trim().required()
})

// get /auth
router.get('/', (req, res) => {
    res.json({
        message: "auth routes"
    });
});

//POST /auth/signup
router.post('/signup', (req, res, next) => {
    console.log(req.body);
    const result = Joi.validate(req.body, schema);
    if(result.error == null){
        User.findOne({username: req.body.username})
            .then((user) => {
                if(user) {
                    //respond with error
                    const err = new Error('Username Already taken');
                    next(err);
                }
                else{
                    //save the user with hashed password
                    bcrypt.hash(req.body.password, 12)
                    .then(hashedPassword => {
                        // res.json({hashedPassword});
                        User.create({
                            username: req.body.username,
                            password: hashedPassword
                        })
                        .then(insertedUser => {
                            //removes password property from object
                            delete insertedUser.password;//not working 
                            res.json(insertedUser);
                        })
                        .catch(err => next(err));
                    });
                }
            });
    }
    else{
        next(result.error);
    }
});

module.exports = router;