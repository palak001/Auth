const express = require('express');
const Joi = require('joi');

const router = express.Router();
const Note = require('../db/models/note');

const schema = Joi.object().keys({
    title: Joi.string().trim().max(100).required(),
    description: Joi.string().trim().required()
});

router.get('/', (req, res) => {
    res.json([]);
});

router.post('/', (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if(result.error === null) {
        //insert in database
        Note.create({
            ...req.body,
            userId: req.user._id,
        }).then((insertedNote) => {
            console.log(insertedNote);
            res.json(insertedNote);
        })
        .catch((error) => next(error));
    } else {
        const error = new Error(result.error);
        res.status(422);
        next(error);
    }
});

module.exports = router;