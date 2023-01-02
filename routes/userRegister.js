const express = require('express');
const { findById } = require('../models/userModel');
const User = require('../models/userModel');
const router = express.Router();

// Add users.
router.post('/', async (req, res) => {
    let user = User(req.body);
    await user.save();
    res.send(user);
})

// Update user.
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
});

//sub check
router.post('/subcheck', (req, res) => {
    User.findById(req.body.curid)
        .then((result) => {
            if(result.isub){
                if (result.isub.includes(req.body.id)){
                    res.send(true);}
                else{
                    res.send(false);}
            }
            else
            res.send(false);
        })
        .catch((error) => res.status(405).send(error + 'error'));
});

//sub
router.post('/sub', (req, res) => {
    User.findById(req.body.id)
        .then((result)=>{
            if(result.subscriber.includes(req.body.curid)){
                User.findByIdAndUpdate(req.body.id,{$pull:{subscriber:req.body.curid}})
                .then(()=>{
                    User.findByIdAndUpdate(req.body.curid,{$pull:{isub:req.body.id}})
                    .catch((error)=>console.log(error));
                })
                .catch((error)=>console.log(error));
                res.send(false);
            }
            else{
                User.findByIdAndUpdate(req.body.id,{$push:{subscriber:req.body.curid}})
                .then(()=>{
                    User.findByIdAndUpdate(req.body.curid,{$push:{isub:req.body.id}})
                    .catch((error)=>console.log(error));
                })
                .catch((error)=>console.log(error));
                res.send(true);
            }
        })
        .catch((error)=>console.log(error));

});
module.exports = router