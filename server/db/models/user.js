const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
        // select: false // to not include in response
    }
});

module.exports = mongoose.model('User', userSchema);