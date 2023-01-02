const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// get user data after login
router.get('/:name&:password', (req,res) => {
    User.findOne({name:req.params.name})
    .then((result) => {
        if(result.password == req.params.password)
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
        else
        res.send({id:null});
    })
    .catch((err)=>res.send(err));
})

module.exports = router