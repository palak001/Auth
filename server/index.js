const express = require('express');
const morgan = require('morgan');

const app = express();

const auth = require('./auth/index');

app.use(morgan('dev'));
//built in express bodyparser
app.use(express.json());

//db connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(require('./db/config/keys').mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.json({
        message:'Welcome here!'
    });
});

app.use('/auth', auth); 

//error handling functions
function notFound(req, res, next){
    res.status(404);
    const error = new Error(`Not found-${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack //what's this?
    });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});