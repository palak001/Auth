const jwt = require('jsonwebtoken');
function checkTokenSetUser(req, res, next) {
    const  authHeader = req.get('authorization');
    // console.log(authHeader);
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        if(token) {
            jwt.verify(token, process.env.Token_Secret, (err, user) => {
                if(err) {
                    console.log(err);
                }
                req.user = user;
                next();
            })
        } else {
            next();
        }
    } else {
        next();
    }
}

function isLoggedIn(req, res, next) {
    if(req.user) {
        next();
    }
    else {
        const error = new Error('UnAuthorized.');
        res.status(401);
        next(error);
    }
}

module.exports = {
    checkTokenSetUser,
    isLoggedIn,
};