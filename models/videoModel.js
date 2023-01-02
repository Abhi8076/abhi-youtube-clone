const mongoose = require('mongoose')

const videoschema = new mongoose.Schema({
    creatorid:{
        type: String,
        require:true
    },
    creatorname:{
        type: String,
        require:true
    },
    creatorcountry:{
        type: String,
        require:true
    },
    creatorprofilepic:{
        type: String,
        require:true
    },
    link:{
        type: String,
        require:true
    },
    thumbnail:{
        type: String,
        require:true
    },
    title:{
        type: String,
        require: true
    },
    des:{
        type: String,
        require: true
    },
    tags:{
        type: Array,
        require: true
    },
    likes:{
        type: Number,
        default:0
    },
    dislike:{
        type: Number,
        default:0
    },
    views: {
        type: Number,
        default:0
    }
});

module.exports = mongoose.model('videos', videoschema);
