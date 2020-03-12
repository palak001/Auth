const express = require('express');
const Joi = require('joi');

const router = express.Router();
const Book = require('../db/models/book');

// const schema = Joi.object().keys({
//     title: Joi.string().trim().max(100).required(),
//     description: Joi.string().trim().required()
// });

router.get('/', (req, res) => {
    Book.find({userId: req.user._id})
    .then(books => {
        res.json(books);
    });
});

router.post('/', (req, res, next) => {
    // const result = Joi.validate(req.body, schema);
    // if(result.error === null) {
        //insert in database
        Book.create({
            ...req.body,
            userId: req.user._id,
        }).then((insertedBook) => {
            console.log(insertedBook);
            res.json(insertedBook);
        })
        .catch((error) => next(error));
    // } else {
    //     const error = new Error(result.error);
    //     res.status(422);
    //     next(error);
    // }
});
// { $text: { $search: "java shop -coffee" } }

router.delete('/:bookId', (req, res) => {
    Book.findOneAndDelete({_id: req.params.bookId})
    .then(deletedBook => {
        console.log(deletedBook);
        res.json(deletedBook);
    })
    .catch(error => {
        console.log(error);
    });
});

module.exports = router;