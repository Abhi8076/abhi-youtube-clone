const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    subscriber: [String],
    isub: [String],
    des:{type: String,default:"nothing"},
    country:{type: String},
    profilepic:{type: String},
    banner:{type: String}
});

module.exports = mongoose.model('users', userschema);