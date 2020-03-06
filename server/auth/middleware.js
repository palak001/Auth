const jwt = require('jsonwebtoken');
function checkTokenSetUser(req, res, next) {
    const  authHeader = req.get('authorization');
    // console.log(authHeader);
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        if(token) {
            //do something
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

module.exports = {
    checkTokenSetUser
};