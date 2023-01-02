const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

//get creator data
router.get('/:creatorid', (req,res) => {
    User.findById(req.params.creatorid)
    .then((result) => {
        res.send({
            id:result.id,
            name:result.name,
            email:result.email,
            subscriber:result.subscriber,
            isub:result.isub,
            des:result.des,
            country:result.country,
            profilepic:result.profilepic,
            banner:result.banner
        });
    })
    .catch((err)=>res.send(err));
})

module.exports = router